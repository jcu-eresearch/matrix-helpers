#!/usr/bin/env python3

import json
import sys

# Load the webhostinghub-glyphs/config.json file and output just the JSON array
# of the icon CSS names

with open(sys.argv[1]) as data:
    json_data = json.load(data)
    prefix = json_data['css_prefix_text']
    json.dump(
        [prefix + glyph['css'] for glyph in json_data['glyphs']],
        fp=sys.stdout
    )
