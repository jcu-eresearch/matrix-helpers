# Development Practices

Development in Matrix is very manual: you need to use your web browser,
version control is a myth, testing is by hand and dev is pretty much just
trial and error.  Here's a few suggestions to help.

## General

* The administrative backend is accessible by appending `/_admin` to the URL
  of any Asset.

* The Edit+ interface (for content editors and easier uploading of multiple
  Assets) is accessible by appending `/_edit` to the URL of any Asset.

## Cautions

* All metadata, permissions and other settings within Matrix are assigned at
  an Asset level.  This means that you need to be careful that permissions are
  set correctly as the process of creating a new asset sees permissions
  *copied* to each new child of a parent.

* Matrix has a propensity to timeout with `504 Gateway Timeout` errors when
  performing certain tasks (viewing history, saving content) or in some cases
  simply *ignore* requests you make to save content, as if you never made the
  request.  Be prepared to either have a copy of your data locally or copied
  to your clipboard before you click `Commit` or `Save`.

## Metadata

* **Warning, warning, warning!** The **most important** thing to know about
  creating metadata schemas is that once you've created a field and people are
  actively using it, you **cannot** change the field type.  So a change from
  `Text` to `WYSIWYG` or `Text` to `Select` is impossible without recreating
  data!

* If changing a `Metadata Schema` that has been applied to Assets, ensure you
  choose to `Regenerate metadata files` after each change or else the
  new/modified fields will not be shown on the given Assets.

* Enabling `Show on Frontend` for metadata schemas will result in the fields
  being echoed into the `<head>` the resulting rendered page as `<meta>` tags.

  * In order to ease development, don't turn this option off until you're
    finished.  Matrix doesn't have any discernible way of printing *all*
    metadata so this is as close as it gets.

  * In the Matrix admin interface, you can view all front-end metadata on the
    `Metadata` screen without needing to inspect rendered pages on the
    front-end.

* Your Design needs to have the `parse/metadata.xml` snippet in place in order
  to display front-end metadata in the `<head>` of a final rendered page.

* For ease of namespacing and avoiding conflict, metadata schema fields should
  be formatted in a manner such as `org.site.logo`, with dots delimiting
  namespaces.  Change `org` to be your own organisation's identifier.

* There are no Boolean fields in Metadata Schemas. You'll have to use a
  `select` type field instead and fake it.

## Keywords

* Conditional Keywords **are not** available in Design files.

* Keywords **are not** available in CSS/JS files.  In order to use keywords
  inside either of these, they would need to be inline CSS in a page, use
  declarative HTML attributes for JS (eg `data-*`) or use some weird hack
  involving Page assets, where keywords work.

* Global keywords (eg `%globals_asset_type%`) may evaluate to a different
  result depending on where the keyword is called (eg for Site index pages,
  the same keyword will be different in the Design parse file compared to a
  nested content page).  See the following example.

  Design context:

      design-landing layout-content type-site site-demo section-demo_home

  Page content context:

      design-landing layout-landing type-standard_page site-demo section-demo_home

* There's a lot of keywords in Matrix.  By using the `keywords/master.html` as
  the Parse file for a Design, you can associate this file with any given
  `Asset` to dump all the various keywords to the page.  Now, just search
  through the page to find value you need!

* Still confused over whether a given keyword exists in Matrix?  Don't worry,
  you're not alone.

  For general metadata-centric asset keywords, look at
  `generateKeywordReplacements(..)` in 
  `core/include/metadata_manager.inc:2047`, which is the PHP generator of
  keyword replacements (or PHP code to generate them).  This covers most
  general keywords used throughout Matrix.

  For asset-centric keywords, simply grep through the source code in Matrix
  for the term ``function getKeywordReplacement``.  This will yield all
  potential locations where keywords might be queried.  See also
  `replace_global_keywords()` inside `core/include/general.inc:2193` for more
  details on how globals are constructed and see `_getKeywordReplacement` in
  `core/include/asset.inc:4173` for the code that builds local keywords.

## Security

* To avoid further XSS vulnerabilities, any keywords should utilise the
  `^escapehtml` keyword modifier when being outputted.

  * It is not known at this time whether Design Parse code has an equivalent
    escaping mechanism.
