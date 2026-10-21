#!/usr/bin/env bash
# Situational scan: current branch, all worktrees, files each one is changing,
# and which coding agents are running. Read-only; safe to run any time.
# Usage: scan.sh [repo_path]
set -u
cd "${1:-.}" 2>/dev/null || { echo "cannot cd to ${1:-.}"; exit 1; }
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "not a git repo"; exit 1; }

base=$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##')
[ -z "$base" ] && for b in main master; do git show-ref --verify --quiet "refs/heads/$b" && base=$b && break; done
[ -z "$base" ] && base=$(git branch --show-current)

echo "== This checkout =="
echo "path:   $(git rev-parse --show-toplevel)"
echo "branch: $(git branch --show-current)"
[ -z "$(git branch --show-current)" ] && echo "        (detached HEAD)"
echo "base:   $base"
echo "head:   $(git log -1 --format='%h %s (%cr)' 2>/dev/null)"
echo

echo "== Worktrees (what each one is changing) =="
git worktree list --porcelain | sed -n 's/^worktree //p' | while IFS= read -r wt; do
  br=$(git -C "$wt" branch --show-current 2>/dev/null)
  dirty=$(git -C "$wt" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  ahead=$(git -C "$wt" rev-list --count "$base"..HEAD 2>/dev/null || echo "?")
  gd=$(git -C "$wt" rev-parse --git-dir 2>/dev/null)
  lock=""; [ -f "$wt/$gd/index.lock" ] || [ -f "$gd/index.lock" ] && lock="  [index.lock present: git op in progress]"
  echo "- $wt"
  echo "    branch: ${br:-(detached)} | $ahead commit(s) ahead of $base | $dirty uncommitted file(s)$lock"
  { git -C "$wt" diff --name-only "$base"...HEAD 2>/dev/null; git -C "$wt" status --porcelain 2>/dev/null | cut -c4-; } \
    | sort -u | sed '/^$/d' | head -15 | sed 's/^/    touches: /'
done
echo

echo "== Recently active branches =="
git for-each-ref --sort=-committerdate --count=8 \
  --format='%(refname:short)|%(committerdate:relative)|%(subject)' refs/heads \
  | awk -F'|' '{printf "- %-28s %-16s %s\n",$1,$2,$3}'
echo

echo "== Coding agents running on this machine =="
found=0
while IFS= read -r line; do
  pid=$(echo "$line" | awk '{print $1}')
  cwd=""
  if [ -e "/proc/$pid/cwd" ]; then cwd=$(readlink "/proc/$pid/cwd" 2>/dev/null)
  elif command -v lsof >/dev/null 2>&1; then cwd=$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p'); fi
  echo "- $line${cwd:+  (cwd: $cwd)}"; found=1
done < <(ps -eo pid=,etime=,args= 2>/dev/null \
  | grep -Ei '(^|[ /])(codex|claude|cursor-agent|aider|gemini|opencode)( |$)' \
  | grep -v -E "grep|scan\.sh" | cut -c1-140)
[ "$found" = 0 ] && echo "(none detected; agents inside desktop apps may not show here, so also trust the worktree list above)"
