#!/bin/sh
# Subsets Material Icons to the glyphs referenced by <Icon name="..."> in app/.
# Re-run after adding an icon. Needs fonttools: python3 -m fontTools.
set -e
cd "$(dirname "$0")/.."
icons=$(rg -oN --no-filename '<Icon name="([a-z0-9_]+)"' -r '$1' app | sort -u | tr '\n' ' ')
echo "icons: $icons"
python3 -m fontTools.subset scripts/MaterialIcons-Regular.ttf \
  --text="$icons" --layout-features=rlig --no-hinting \
  --output-file=app/assets/MaterialIcons.ttf
