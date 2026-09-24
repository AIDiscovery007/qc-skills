#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "usage: prepare-output.sh <slug>" >&2
}

if [[ $# -ne 1 ]]; then
  usage
  exit 2
fi

raw_slug="$1"

slug="$(
  printf '%s' "$raw_slug" |
    tr '[:upper:]' '[:lower:]' |
    sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g'
)"

if [[ -z "$slug" ]]; then
  slug="render"
fi

mkdir -p docs/report

gitignore=".gitignore"
if [[ ! -f "$gitignore" ]]; then
  printf '/docs/\n' > "$gitignore"
elif ! grep -Fxq '/docs/' "$gitignore"; then
  if [[ -s "$gitignore" ]]; then
    last_char="$(tail -c 1 "$gitignore" || true)"
    if [[ -n "$last_char" ]]; then
      printf '\n' >> "$gitignore"
    fi
  fi
  printf '/docs/\n' >> "$gitignore"
fi

candidate="docs/report/$slug.html"
if [[ ! -e "$candidate" ]]; then
  printf '%s\n' "$candidate"
  exit 0
fi

i=2
while true; do
  candidate="docs/report/$slug-$i.html"
  if [[ ! -e "$candidate" ]]; then
    printf '%s\n' "$candidate"
    exit 0
  fi
  i=$((i + 1))
done
