# Media Source Normalization

Use this when the source is a local media file, media URL, or audio file such as `mp4`, `mov`, `mkv`, `webm`, `wav`, `mp3`, or `m4a`. Goal: obtain faithful text before message planning with a clear branch-local tool plan.

## Operating Rules

- Build the required-tool list when entering a branch, then check each tool once with `command -v <tool>`.
- Use a binary decision for missing tools: if present, use it; if missing, ask the user whether to install/download the missing dependency, then resume from the blocked action after it is available. Do not bounce between alternate extraction paths because a tool is missing.
- Install through an existing installer only after user confirmation. Do not install Homebrew, apt, Conda, Nix, or another package manager as a side effect.
- Subtitle-first, ASR-last for local video. Prefer sidecar or embedded subtitles because ASR can introduce wording errors.
- Use local ASR only through `ffmpeg` + `whisper-cli` + a `ggml-small.bin` model.
- Use the low-CPU ASR preset by default: `nice -n 10`, `-t 2`, `-p 1`, `-bs 1`, and `-bo 1`. This is slower but reduces CPU pressure and fan noise.
- Put temporary subtitle/audio/transcript files under `qc-image-series-output/.tmp/<slug>/`; the final slug folder contains only `series-spec.md`.

## Decision SOP

1. If the source is already text, transcript, `.srt`, `.vtt`, `.ass`, `.ssa`, or `.txt`, use it directly. No media tools are required.
2. If a local video has a same-basename sidecar subtitle file, use that subtitle. Do not inspect the container and do not run ASR.
3. If the source is a media URL, check only `yt-dlp`. If missing, ask the user whether to install it. Run subtitle-only download first: human subtitles, then auto subtitles. If subtitles are found, use them. Do not download media and do not run ASR unless the user explicitly asks.
4. If the source is a local video/container and no sidecar subtitle exists, check `ffprobe` and `ffmpeg` once before container inspection.
5. Use `ffprobe` to inspect embedded subtitle streams. If a usable text subtitle stream exists, extract it with `ffmpeg` and use it. Do not run ASR.
6. If no embedded subtitle exists, or the only embedded subtitle is not text-extractable, enter local ASR fallback directly. Do not re-check sidecars or re-inspect the container.
7. If the source is audio-only and no transcript exists beside it, enter local ASR fallback immediately.
8. In local ASR fallback, check `ffmpeg` if it was not already checked, then check `whisper-cli` and resolve a `ggml-small.bin` model. If either ASR dependency is missing, ask the user whether to download/install it. Do not silently switch to another ASR engine or a larger model.
9. If no subtitle or ASR transcript can be obtained, stop and explain the blocker. Do not invent transcript content.

## Local Video Commands

Inspect embedded subtitles:

```bash
ffprobe -v error -select_streams s -show_entries stream=index,codec_name:stream_tags=language,title -of json "<source-video>"
```

Extract the first usable text subtitle stream:

```bash
ffmpeg -y -i "<source-video>" -map 0:s:0 -c:s webvtt "qc-image-series-output/.tmp/<slug>/embedded.vtt"
```

If subtitle extraction fails because the embedded stream is image-based or otherwise not text-extractable, treat it as no usable embedded subtitle and continue to local ASR fallback.

## Local ASR Fallback

Resolve the small model in this order:

1. A model path explicitly provided by the user.
2. `WHISPER_SMALL_MODEL`, if set and the file exists.
3. `$HOME/Library/Application Support/ScreenStudio/models/ggml-small.bin`, if it exists.
4. `$HOME/.cache/whisper.cpp/ggml-small.bin`, if it exists.

If no `ggml-small.bin` exists, ask the user whether to download or provide the small model. Do not use `base`, `medium`, `large`, or remote transcription as an implicit substitute.

Extract clean audio:

```bash
ffmpeg -y -i "<source-media>" -vn -ac 1 -ar 16000 -c:a pcm_s16le "qc-image-series-output/.tmp/<slug>/audio.wav"
```

Transcribe with the low-CPU preset:

```bash
nice -n 10 whisper-cli \
  -m "<path-to-ggml-small.bin>" \
  -f "qc-image-series-output/.tmp/<slug>/audio.wav" \
  -l auto \
  -t 2 \
  -p 1 \
  -bs 1 \
  -bo 1 \
  -otxt \
  -ovtt \
  -of "qc-image-series-output/.tmp/<slug>/transcript"
```

## Tool Roles

- `yt-dlp`: only for URL subtitle discovery/download.
- `ffprobe`: only for inspecting local media containers for embedded subtitle streams.
- `ffmpeg`: only for extracting embedded subtitles or 16 kHz mono WAV audio for ASR.
- `whisper-cli`: the only local ASR engine for this skill.
- `ggml-small.bin`: the only local ASR model size for this skill.

## Output Into series-spec.md

Record provenance, not the whole raw transcript:

```md
Source: /path/or/url
Source type: media
Source normalization: existing transcript | sidecar subtitles | downloaded subtitles | embedded subtitles | ASR transcript
Transcript notes: language, rough duration, timestamp ranges used, tool path, model path when ASR was used, low-CPU preset, and confidence caveats.
```

If the transcript has timestamps, include timestamp evidence for each image:

```md
Evidence cue: "12:30-14:10, 15-20% productivity gain"
```
