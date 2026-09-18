#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: scripts/stack-hygiene.sh <#N|N|branch>" >&2
  exit 2
fi

if ! command -v gh >/dev/null; then
  echo "error: gh is required" >&2
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "error: not a git repo" >&2
  exit 1
fi

primary=$(git worktree list --porcelain | awk '/^worktree /{print $2; exit}')
cd "$primary"

protected() {
  case "$1" in
    main|master) return 0 ;;
    *) return 1 ;;
  esac
}

input=$1
if [[ "$input" =~ ^#?[0-9]+$ ]]; then
  pr=${input#\#}
  state=$(gh pr view "$pr" --json state --jq .state)
  branch=$(gh pr view "$pr" --json headRefName --jq .headRefName)
else
  branch=$input
  pr=$(gh pr list --head "$branch" --state merged --limit 1 --json number --jq '.[0].number // empty')
  state=$(gh pr list --head "$branch" --state merged --limit 1 --json state --jq '.[0].state // empty')
  if [ -z "$pr" ]; then
    echo "error: no MERGED PR for branch $branch" >&2
    exit 1
  fi
fi

if [ "$state" != "MERGED" ]; then
  echo "error: PR #$pr is $state, not MERGED" >&2
  exit 1
fi

if protected "$branch"; then
  echo "error: refusing to delete $branch" >&2
  exit 1
fi

echo "PR #$pr is MERGED (branch $branch)"

while read -r wt; do
  [ "$wt" = "$primary" ] && continue
  br=$(git -C "$wt" symbolic-ref --quiet --short HEAD 2>/dev/null || true)
  [ "$br" = "$branch" ] || continue
  if [ -n "$(git -C "$wt" status --porcelain)" ]; then
    echo "error: worktree $wt is dirty" >&2
    exit 1
  fi
  git worktree remove "$wt"
  echo "removed worktree $wt"
done < <(git worktree list --porcelain | awk '/^worktree /{print $2}')

git worktree prune

if git show-ref --verify --quiet "refs/heads/$branch"; then
  current=$(git symbolic-ref --quiet --short HEAD || true)
  if [ "$current" = "$branch" ]; then
    echo "error: $primary has $branch checked out" >&2
    exit 1
  fi
  git branch -D "$branch"
  echo "deleted local $branch"
else
  echo "local $branch already gone"
fi

if git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
  git push origin --delete "$branch"
  echo "deleted origin/$branch"
else
  echo "origin/$branch already gone"
fi

git fetch --prune origin

echo "--- branches ---"
git branch -vv
echo "--- remotes ---"
git branch -r
echo "--- worktrees ---"
git worktree list
echo "--- status ---"
git status
