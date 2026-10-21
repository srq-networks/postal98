#!/bin/sh
# Builds the site and uploads it to the cPanel Node.js app, then restarts it.
# Usage: scripts/deploy.sh user@host [app-dir]   (app-dir is relative to the home directory)
# First deploy: run "NPM Install" in cPanel's Setup Node.js App once the files are up.
set -e
cd "$(dirname "$0")/.."
host=${1:?usage: scripts/deploy.sh postal98cafe2026@postal98cafe.com [app-dir]}
dir=${2:-postal98}

bun run build
rsync -az --delete build/client/ "$host:$dir/public/"
rsync -az server/app.js server/package.json "$host:$dir/"
ssh "$host" "mkdir -p $dir/tmp && touch $dir/tmp/restart.txt"
