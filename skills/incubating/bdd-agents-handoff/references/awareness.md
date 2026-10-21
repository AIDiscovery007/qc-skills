# Situational awareness commands

Run these from the repo root. They are read-only, so they are safe to run any time.

## Where am I

```bash
git rev-parse --show-toplevel          # repo root
git branch --show-current              # current branch (empty means detached HEAD)
git worktree list                      # every worktree: path, commit, branch
git status --short --branch            # uncommitted changes here, ahead/behind
```

## What are other agents doing (git state, works everywhere)

```bash
git branch -vv --sort=-committerdate | head -20     # recent branches, upstream, last commit
git log --all --since="6 hours ago" --format='%h %an %ar %D %s' | head -20

# per worktree: uncommitted changes and last commit
git worktree list --porcelain | awk '/^worktree /{print $2}' | while read -r wt; do
  echo "== $wt"; git -C "$wt" status --short --branch | head -15
done

# files each branch has changed relative to the integration branch (replace main)
for b in $(git for-each-ref --format='%(refname:short)' refs/heads/); do
  echo "== $b"; git diff --name-only main..."$b" | head -15
done
```

Overlap between two branches' file lists, or between a branch and someone's uncommitted files, is the conflict signal.

## Active agent processes (only on the machine where the agents run)

```bash
ps aux | grep -Ei '(codex|claude|cursor|aider|gemini)' | grep -v grep
lsof -c codex -c claude 2>/dev/null | grep cwd     # which directories they work in
```

In a cloud sandbox these show nothing about the user's machine. Say so and rely on git state.

## Reading the snapshot

Report in a few lines: current worktree and branch, other worktrees with their branch and whether they have uncommitted changes, any file overlap, and any agent processes found. Then act on it (reschedule, set boundaries, or build on a clean worktree).
