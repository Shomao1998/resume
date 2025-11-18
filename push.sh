#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This script must be run from inside a git repository." >&2
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  cat >&2 <<'MSG'
No remote named "origin" has been configured yet.
Run:
  git remote add origin <git-url>
and then re-run this script.
MSG
  exit 1
fi

branch=$(git rev-parse --abbrev-ref HEAD)
if [ -z "$branch" ] || [ "$branch" = "HEAD" ]; then
  echo "Unable to determine the current branch. Ensure you're on a branch (git checkout -b <name>)." >&2
  exit 1
fi

echo "Current branch: $branch"

if git ls-remote --exit-code --heads origin "$branch" >/dev/null 2>&1; then
  echo "Pushing to origin/$branch"
  git push origin "$branch"
else
  echo "origin/$branch does not exist yet; pushing with --set-upstream"
  git push --set-upstream origin "$branch"
fi
