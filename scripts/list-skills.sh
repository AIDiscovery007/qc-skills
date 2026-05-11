#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"

find "$REPO/skills/published" "$REPO/skills/third-party" -name SKILL.md -not -path '*/node_modules/*' | sed "s|^$REPO/||" | sort
