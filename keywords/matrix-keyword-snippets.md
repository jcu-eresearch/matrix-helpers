# Snippets

## Get attribute from current site

    %globals_site_name%
    %globals_site_assetid^as_asset:asset_name%

## Testing if a variable has a value or not

    %globals_foobar^notempty:We have a value!%
    %globals_foobar^empty:We don't have a value!%

## Source code

All the source for `%globals_*%` can be found in
`core/include/general.inc:2193` onwards, such as:

* `%globals_post%`
* `%globals_get%`
* `%globals_user_*%`
* `%globals_session_%`
* `%globals_server_%`
* `%globals_snippet_*%` (unsure what this is)
* `%globals_random%`
* `%globals_context%` (language)
