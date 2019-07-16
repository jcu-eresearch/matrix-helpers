# Escaping guide

Use the following keyword modifiers to escape HTML on output.  Matrix follows
the fast-and-loose theories of security from PHP, which is that data isn't
validated on input and you need to remember to escape each and every single
time you're outputting a value.  Pay **extremely** close attention to what
value you're using and where it's being outtputed.  Different rules apply for
how you want the output to look and whether you want HTML stripped out or
simply escaped.

Outputted as HTML attributes (also okay in ssjs) or clean output into the
middle of a HTML tag (such as a heading or `<title`). The use this order of
operations has the effect of html entity encoding any special characters
left-over after valid HTML is stripped:

    ^striphtml^escapehtml

Outputted as visibly escaped HTML (eg within middle of tags); this has the
effect of leaving any escaped characters visible and not just stripped away:

    ^escapehtml

Use a value as a CSS identifier (fine within CSS, class attributes, SSJS etc):

    ^lowercase^css_safe

Strip/escape Matrix keyword syntax (critical when inputting data into SSJS):

    <script runat="server">
      var slightlySaferValue = JCU.unescapeKeywords('%globals_something^replace:{globals_asset_name:650163}:&percnt;^escapequotes%')
      // This can still be hazardous on output if there were keywords in the underlying replacement value...
      print(slightySaferValue)
    </script>

## Gotchas

Note that if you are using any of the following keywords:

* `asset_name`
* `asset_short_name`
* `asset_name_linked`

Matrix will attempt to be "helpful" and escape any `&` (ampersand) characters
in the string with its equivalent HTML entity, being `&amp;`.  This is
implicitly performed ahead of any keyword resolution.  So, if you are
outputting one of these keywords as escaped HTML (hint: you should always
be!), you'll have to unescape the doubly-escaped ampersand like so:

   `%asset_name^escapehtml^replace:&amp;amp;:&amp;%`

These rules apply to any other keyword context (such as
`%frontend_asset_name%`, `%globals_asset_short_name%`, `%globals_site_name`
and so on) so you'll have to carry this workaround with you pretty much
everywhere until Squiz figures itself out.
