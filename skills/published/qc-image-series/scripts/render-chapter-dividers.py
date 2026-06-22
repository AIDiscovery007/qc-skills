#!/usr/bin/env python3
"""Render fixed-layout chapter divider images from a reference divider."""

from __future__ import annotations

import argparse
import json
import re
import statistics
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


DEFAULT_FONT_CANDIDATES = [
    "/System/Library/Fonts/STHeiti Medium.ttc",
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
]
DEFAULT_REFERENCE = Path(__file__).resolve().parents[1] / "assets" / "chapter-divider-reference.png"


def median_rgb(values: list[tuple[int, int, int]]) -> tuple[int, int, int]:
    channels = list(zip(*values))
    return tuple(int(statistics.median(channel)) for channel in channels)


def load_titles(args: argparse.Namespace) -> list[str]:
    titles: list[str] = []
    if args.title:
        titles.extend(args.title)
    if args.titles_file:
        for line in args.titles_file.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if stripped:
                titles.append(stripped)
    if not titles:
        raise SystemExit("Provide at least one --title or --titles-file.")
    return titles


def choose_font_path(explicit: str | None) -> str:
    if explicit:
        return explicit
    for candidate in DEFAULT_FONT_CANDIDATES:
        if Path(candidate).exists():
            return candidate
    raise SystemExit("No usable font found. Pass --font /path/to/font.ttf.")


def detect_text_bbox(image: Image.Image, threshold: int) -> tuple[int, int, int, int]:
    rgb = image.convert("RGB")
    width, height = rgb.size
    coords: list[tuple[int, int]] = []
    pixels = rgb.load()
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            if r < threshold and g < threshold and b < threshold:
                coords.append((x, y))
    if not coords:
        raise SystemExit("Could not detect dark reference title pixels.")
    xs = [x for x, _ in coords]
    ys = [y for _, y in coords]
    return min(xs), min(ys), max(xs), max(ys)


def sample_background(image: Image.Image, threshold: int) -> tuple[int, int, int]:
    rgb = image.convert("RGB")
    width, height = rgb.size
    pixels = rgb.load()
    samples: list[tuple[int, int, int]] = []
    border = max(12, min(width, height) // 30)
    for y in range(height):
        for x in range(width):
            if not (x < border or x >= width - border or y < border or y >= height - border):
                continue
            r, g, b = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                samples.append((r, g, b))
    if not samples:
        return 242, 237, 228
    return median_rgb(samples)


def text_bbox(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> tuple[int, int]:
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    return right - left, bottom - top


def calibrate_font_size(
    font_path: str,
    reference_title: str,
    reference_height: int,
    max_width: int,
) -> int:
    scratch = Image.new("RGB", (max_width * 2, reference_height * 4), "white")
    draw = ImageDraw.Draw(scratch)
    best_size = 72
    best_error = 10**9
    for size in range(24, 180):
        font = ImageFont.truetype(font_path, size=size)
        width, height = text_bbox(draw, reference_title, font)
        # Prefer matching height; avoid a wildly wider reference title.
        error = abs(height - reference_height) + max(0, width - max_width) * 0.05
        if error < best_error:
            best_error = error
            best_size = size
    return best_size


def wrap_text(
    draw: ImageDraw.ImageDraw,
    title: str,
    font: ImageFont.FreeTypeFont,
    max_width: int,
    max_lines: int,
) -> list[str] | None:
    if text_bbox(draw, title, font)[0] <= max_width:
        return [title]

    tokens = tokenize_title(title)
    lines: list[str] = []
    current = ""
    for token in tokens:
        candidate = current + token
        if current and text_bbox(draw, candidate, font)[0] > max_width:
            lines.append(current.rstrip())
            current = token.lstrip()
            if len(lines) >= max_lines:
                return None
        else:
            current = candidate
    if current:
        lines.append(current.rstrip())
    if len(lines) > max_lines:
        return None
    return lines


def tokenize_title(title: str) -> list[str]:
    """Keep Latin words intact while allowing CJK text to wrap by character."""
    tokens: list[str] = []
    for part in re.findall(r"[A-Za-z0-9][A-Za-z0-9._&+-]*|\s+|.", title):
        if not part:
            continue
        if part.isspace():
            if tokens:
                tokens[-1] += part
            continue
        tokens.append(part)
    return tokens


def fit_lines(
    draw: ImageDraw.ImageDraw,
    title: str,
    font_path: str,
    base_size: int,
    max_width: int,
    max_lines: int,
) -> tuple[list[str], ImageFont.FreeTypeFont, int, bool]:
    for size in range(base_size, 23, -1):
        font = ImageFont.truetype(font_path, size=size)
        lines = wrap_text(draw, title, font, max_width, max_lines)
        if lines is not None:
            return lines, font, size, size != base_size
    font = ImageFont.truetype(font_path, size=24)
    return [title], font, 24, True


def render_title(
    title: str,
    out_path: Path,
    size: tuple[int, int],
    bg: tuple[int, int, int],
    text_color: tuple[int, int, int],
    center: tuple[float, float],
    max_width: int,
    font_path: str,
    base_font_size: int,
    line_height_ratio: float,
) -> dict[str, object]:
    image = Image.new("RGB", size, bg)
    draw = ImageDraw.Draw(image)
    lines, font, actual_size, shrunk = fit_lines(draw, title, font_path, base_font_size, max_width, 2)
    line_metrics = [draw.textbbox((0, 0), line, font=font) for line in lines]
    line_widths = [right - left for left, top, right, bottom in line_metrics]
    line_heights = [bottom - top for left, top, right, bottom in line_metrics]
    line_height = max(line_heights) * line_height_ratio
    block_height = line_height * (len(lines) - 1) + max(line_heights)
    y = center[1] - block_height / 2
    boxes = []
    for index, line in enumerate(lines):
        width = line_widths[index]
        left, top, right, bottom = line_metrics[index]
        x = center[0] - width / 2
        line_y = y + index * line_height - top
        draw.text((x, line_y), line, font=font, fill=text_color)
        boxes.append(
            {
                "line": line,
                "x": round(x, 2),
                "y": round(line_y, 2),
                "width": round(width, 2),
                "height": round(bottom - top, 2),
            }
        )
    image.save(out_path)
    return {
        "title": title,
        "file": str(out_path),
        "font_size": actual_size,
        "shrunk": shrunk,
        "line_count": len(lines),
        "boxes": boxes,
    }


def parse_rgb(value: str) -> tuple[int, int, int]:
    value = value.strip().lstrip("#")
    if len(value) != 6:
        raise argparse.ArgumentTypeError("Expected HEX color like #1A1A1E.")
    return int(value[0:2], 16), int(value[2:4], 16), int(value[4:6], 16)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--reference", type=Path)
    parser.add_argument("--out-dir", type=Path, required=True)
    parser.add_argument("--title", action="append")
    parser.add_argument("--titles-file", type=Path)
    parser.add_argument("--font")
    parser.add_argument("--reference-title", default="Essence : 信息提取与降噪")
    parser.add_argument("--threshold", type=int, default=100)
    parser.add_argument("--text-color", type=parse_rgb, default=(26, 26, 30))
    parser.add_argument("--line-height", type=float, default=1.16)
    parser.add_argument("--background", type=parse_rgb)
    args = parser.parse_args()

    reference_path = args.reference or DEFAULT_REFERENCE
    if not reference_path.exists():
        raise SystemExit(f"Reference image not found: {reference_path}")

    reference = Image.open(reference_path).convert("RGB")
    ref_bbox = detect_text_bbox(reference, args.threshold)
    left, top, right, bottom = ref_bbox
    center = ((left + right) / 2, (top + bottom) / 2)
    ref_width = right - left + 1
    ref_height = bottom - top + 1
    max_width = ref_width
    bg = args.background or sample_background(reference, args.threshold)
    font_path = choose_font_path(args.font)
    base_font_size = calibrate_font_size(font_path, args.reference_title, ref_height, max_width)

    args.out_dir.mkdir(parents=True, exist_ok=True)
    titles = load_titles(args)
    metrics = {
        "reference": str(reference_path),
        "reference_source": "user" if args.reference else "bundled-default",
        "reference_size": reference.size,
        "reference_bbox": ref_bbox,
        "reference_center": [round(center[0], 2), round(center[1], 2)],
        "max_width": max_width,
        "background_rgb": bg,
        "text_color_rgb": args.text_color,
        "font": font_path,
        "base_font_size": base_font_size,
        "items": [],
    }

    for index, title in enumerate(titles, start=1):
        slug = f"{index:02d}.png"
        metrics["items"].append(
            render_title(
                title=title,
                out_path=args.out_dir / slug,
                size=reference.size,
                bg=bg,
                text_color=args.text_color,
                center=center,
                max_width=max_width,
                font_path=font_path,
                base_font_size=base_font_size,
                line_height_ratio=args.line_height,
            )
        )

    (args.out_dir / "metrics.json").write_text(
        json.dumps(metrics, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(metrics, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
