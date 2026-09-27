#!/usr/bin/env bash
# Local verification harness — dev-only, never deployed.
# Serves the current site/ (after) and the baseline site/ from git (before) with placeholder plates,
# then runs run.cjs (Playwright + Chromium). Usage: tools/verify/run.sh [baseline-commit]
set -euo pipefail
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../.." && pwd)
BASE_REF=${1:-46af32e}
cd "$HERE"
[ -f vendor/lucide.version ] || ./fetch_vendor.sh
[ -d fixtures_after ] || python3 make_fixtures.py
rm -rf .before out && mkdir -p .before out
git -C "$ROOT" archive "$BASE_REF" site | tar -x -C .before
python3 serve.py "$ROOT/site" fixtures_after 8123 & A=$!
python3 serve.py .before/site fixtures 8124 & B=$!
trap 'kill $A $B 2>/dev/null || true' EXIT
sleep 1
NODE_PATH=$(npm root -g) node run.cjs
