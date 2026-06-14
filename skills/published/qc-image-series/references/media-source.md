# Media Source Normalization

Use this when the source is a local media file, media URL, or audio file such as `mp4`, `mov`, `mkv`, `webm`, `wav`, `mp3`, or `m4a`.

Goal: obtain the most faithful text before message planning. Keep this layer separate from platform presets and visual style.

## Operating Rules

- Subtitle-first, ASR-last. Prefer real subtitles/transcripts because ASR can introduce wording errors.
- Check only the tools required for the current branch. Do not preflight or install every possible tool.
- Use `command -v <tool>` to check availability. Install through an existing installer only; do not install Homebrew, apt, Conda, Nix, or another package manager as a side effect.
- If no safe installer exists, stop before extraction and report the missing tool, why it is required, and the install command the user can run.
- Put temporary subtitle/audio/transcript files outside the output folder; the final output folder contains only `series-spec.md`.

## Decision SOP

Run these rules from top to bottom. Stop at the first successful transcript source or hard blocker.

1. If the source is already text, transcript, `.srt`, `.vtt`, `.ass`, `.ssa`, or `.txt`, use it directly. No media tools are required.
2. If a local video has a same-basename sidecar subtitle file, use that subtitle. Do not inspect the container and do not run ASR.
3. If the source is a media URL, check only `yt-dlp`. If missing, install or stop. Run subtitle-only download first: human subtitles, then auto subtitles. If subtitles are found, use them. Do not download media and do not run ASR.
4. If the source is a local video/container and no sidecar subtitle exists, check `ffprobe` and `ffmpeg`. If missing, install or stop. Inspect embedded subtitle streams. If subtitles exist, extract them and use them. Do not run ASR.
5. If no sidecar, downloaded, or embedded subtitles exist, enter ASR fallback. Check `ffmpeg` plus one mature ASR tool such as `whisper`, `faster-whisper`, or `whisper.cpp`. If missing, install or stop. Extract clean audio and transcribe.
6. If the source is audio-only and no transcript exists beside it, enter ASR fallback immediately.
7. If no subtitle or ASR transcript can be obtained, stop and explain the blocker. Do not invent transcript content.

## Tool Roles

- `yt-dlp`: only for URL subtitle discovery/download.
- `ffprobe`: only for inspecting local media containers for embedded subtitle streams.
- `ffmpeg`: only for extracting embedded subtitles or audio for ASR.
- `whisper`, `faster-whisper`, `whisper.cpp`, or equivalent mature ASR: only after all subtitle paths fail.

## Output Into series-spec.md

Record provenance, not the whole raw transcript:

```md
Source: /path/or/url
Source type: media
Source normalization: existing transcript | sidecar subtitles | downloaded subtitles | embedded subtitles | ASR transcript
Transcript notes: language, rough duration, timestamp ranges used, and confidence caveats.
```

If the transcript has timestamps, include timestamp evidence for each image:

```md
Evidence cue: "12:30-14:10, 15-20% productivity gain"
```
