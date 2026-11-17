#!/usr/bin/env bash
# Builds the site for GitHub Pages and pushes it to the gh-pages branch.
# Use this while GitHub Actions cannot run (the pages.yml workflow does the same thing in CI).
set -euo pipefail

cd "$(dirname "$0")/.."
REPO_NAME="$(basename -s .git "$(git remote get-url origin)")"
REMOTE="$(git remote get-url origin)"
SHA="$(git rev-parse --short HEAD)"

python3 scripts/check_docs.py docs --strict
GDD_BASE="/${REPO_NAME}/" npm run build

OUT="$(mktemp -d)"
cp -R docs/.vitepress/dist/. "$OUT/"
touch "$OUT/.nojekyll"   # serve files as they are, no Jekyll processing

cd "$OUT"
git init -q
git checkout -q -b gh-pages
git add -A
git commit -q -m "Deploy site from ${SHA}"
git push -q -f "$REMOTE" gh-pages
echo "Deployed ${SHA} to gh-pages"
