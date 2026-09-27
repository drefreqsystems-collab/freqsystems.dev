#!/usr/bin/env bash
# Fetch the libraries the site loads from unpkg, as npm tarballs of the same versions, so the
# harness can run without CDN access. Lucide is loaded as @latest by the site; the resolved
# version is recorded in vendor/lucide.version.
set -euo pipefail
cd "$(dirname "$0")"; mkdir -p vendor; cd vendor
LUC=$(npm view lucide version)
npm pack react@18.3.1 react-dom@18.3.1 three@0.169.0 "lucide@$LUC" --silent
for t in *.tgz; do d=${t%.tgz}; mkdir -p "$d"; tar -xzf "$t" -C "$d"; done
echo "$LUC" > lucide.version
