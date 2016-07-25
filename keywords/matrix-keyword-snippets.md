# Snippets

## Get attribute from current site

    %globals_site_name%
    %globals_site_assetid^as_asset:asset_name%

## Testing if a variable has a value or not

    %globals_foobar^notempty:We have a value!%
    %globals_foobar^empty:We don't have a value!%

## Cache busting

Use the Matrix versioning as the version updates whenever an Asset changes:

    ./?a=12345?v=%globals_asset_version:12345%

This combines two of Matrix's rendering steps: the global keyword and the
asset URL resolver.

## Including contents in another page

    %globals_asset_contents_raw:12345%

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
