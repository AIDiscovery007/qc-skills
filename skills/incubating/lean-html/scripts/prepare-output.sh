#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "usage: prepare-output.sh <report|prototype|other> <slug>" >&2
}

if [[ $# -ne 2 ]]; then
  usage
  exit 2
fi

category="$1"
raw_slug="$2"

case "$category" in
  report|prototype|other) ;;
  *)
    echo "error: category must be report, prototype, or other" >&2
    exit 2
    ;;
esac

slug="$(
  printf '%s' "$raw_slug" |
    tr '[:upper:]' '[:lower:]' |
    sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g'
)"

if [[ -z "$slug" ]]; then
  slug="render"
fi

mkdir -p docs/report docs/prototype docs/other

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

candidate="docs/$category/$slug.html"
if [[ ! -e "$candidate" ]]; then
  printf '%s\n' "$candidate"
  exit 0
fi

i=2
while true; do
  candidate="docs/$category/$slug-$i.html"
  if [[ ! -e "$candidate" ]]; then
    printf '%s\n' "$candidate"
    exit 0
  fi
  i=$((i + 1))
done
