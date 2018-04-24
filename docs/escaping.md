# Escaping guide

Outputted as HTML attributes (also okay in SSJS):

    ^striphtml^htmlentities:ENT_QUOTES

Outputted as visibly escaped HTML (eg within middle of tags):

    ^htmlentities:ENT_QUOTES

Clean up for output into the middle of a HTML tag (eg `<title>` tags):

    ^striphtml

Strip/escape Matrix keyword syntax (critical when inputting data into SSJS):

    JCU.unescapeKeywords('%globals_something^replace:{globals_asset_name:650163}:&percnt;^escapequotes%')

Use a value as a CSS identifier (fine within CSS, class attributes, SSJS etc):

    ^lowercase^css_safe
