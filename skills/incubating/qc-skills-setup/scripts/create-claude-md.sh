#!/usr/bin/env bash
set -euo pipefail

agents_file="AGENTS.md"
claude_file="CLAUDE.md"
import_line="@AGENTS.md"

if [[ ! -f "$agents_file" ]]; then
  echo "error: AGENTS.md not found in $(pwd)" >&2
  exit 1
fi

if [[ ! -e "$claude_file" ]]; then
  printf '%s\n' "$import_line" > "$claude_file"
  echo "created CLAUDE.md importing AGENTS.md"
  exit 0
fi

if [[ ! -f "$claude_file" ]]; then
  echo "error: CLAUDE.md exists but is not a regular file" >&2
  exit 1
fi

if grep -Fq "$import_line" "$claude_file"; then
  echo "CLAUDE.md already imports AGENTS.md"
  exit 0
fi

if [[ -s "$claude_file" ]]; then
  last_char="$(tail -c 1 "$claude_file" || true)"
  if [[ -n "$last_char" ]]; then
    printf '\n' >> "$claude_file"
  fi
  printf '\n## Shared Agent Instructions\n\n%s\n' "$import_line" >> "$claude_file"
else
  printf '%s\n' "$import_line" > "$claude_file"
fi

echo "updated CLAUDE.md importing AGENTS.md"
