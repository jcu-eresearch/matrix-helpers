#!/usr/bin/env python3

import json
import sys

# Load the webhostinghub-glyphs/config.json file and output just the JSON array
# of the icon CSS names
try:
    with open(sys.argv[1]) as data:
        json_data = json.load(data)
        prefix = json_data['css_prefix_text']
        json.dump(
            [prefix + glyph['css'] for glyph in json_data['glyphs']],
            fp=sys.stdout
        )
except:
    print('Usage: ' + sys.argv[0] + ' [webhostinghub-glyphs/config.json]')
    print('This script takes one argument, the path to config.json and '
          'outputs the resulting JSON to stdout.')
