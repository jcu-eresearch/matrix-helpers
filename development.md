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

## Sites

To create a site, you'll find the `Site` asset in the admin asset map
(left-hand side) by right-clicking and choosing `New Child` →  `Web` →
`Site`.  Sites require a URL, which can actually be anything (though
connecting arbitrary URLs to Matrix has not yet been explored), and you can
configure an index page (home page), not found page (404 page), and an archive
page (403 Forbidden page).  Sites have one or more Design assets associated
with them, though just one Design is set as the main.

When creating a Site, you should to consider locking the site's linkage
(see the `Linking` page in the admin UI) to the given folder to prevent anyone
trashing the Site accidentally.

## Metadata

Metadata is the core to actually being able to create solutions and
program (term used very loosely) within Matrix.  Essentially, you can test in
various areas of Matrix whether a field is set or present, and show some HTML
accordingly.  In most cases, it's possible to test the inverse and not show
HTML until a condition is true.

Schemas have sections and sections have fields; metadata fields and sections
appear in the `Metadata` tab in Edit+ or the relevant Admin screen.  There are
various types of fields, though ensure you get the field type right the first
go.

One can create and assign custom metadata fields to different assets by
creating a Metadata Schema (`Schemas` →  `Metadata Schema`), and then
assigning the Schema to a given asset.  It's possible to have a `Metadata
Schema` cascade its application to newly created child Assets (such as a
schema you want to apply to a whole site or folder); this needs configuration
by an backend admin but will apply automatically and transparently for an
editor who is creating content.

From the technical side of Metadata Schemas, there is also the ability to filter
fields based on asset type, so you could have a single Schema that applies in
different ways to different assets.

### Use in keywords

Metadata can be used within keywords, such as within a Design or within a
Page's content somewhere.  This example includes the value of the field called
`Dummy` in the page content, and converts its value into uppercase:

    %asset_metadata_Dummy^uppercase%

Likewise, you could use this same field in the Design of a page like so:

    <h1>%globals_asset_metadata_Dummy^uppercase%</h1>

And finally, you could use the keyword as a conditional like so (only works in
Page content areas):

    %begin_globals_asset_metadata_Dummy%
      Hey, the field Dummy was set!
    %else_globals%
      Sorry, it wasn't set.
    %end_globals%

See more info at the [official
documentation](https://matrix-manuals.squiz.net/keyword-replacements/chapters/conditional-keywords).

### Key notes

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

  * Once you're ready to go to production, then go through and turn off
    anything that's not critical.  You'll just waste people's bandwidth in
    downloading the metadata (and potentially expose sensitive data).

* Your Design needs to have the `parse/metadata.xml` snippet in place in order
  to display front-end metadata in the `<head>` of a final rendered page.

* For ease of namespacing and avoiding conflict, metadata schema fields should
  be formatted in a manner such as `org.site.logo`, with dots delimiting
  namespaces.  Change `org` to be your own organisation's identifier.

* There are no Boolean fields in Metadata Schemas. You'll have to use a
  `select` type field instead and fake it.

## Keywords

Keywords are dynamic pieces of information that you can include in various
areas of Matrix.  Keywords use the format `%keyword_replacement%` and can be
filtered with one or more `^modifier` clauses, which operate like a Unix pipe
on the data passing through.

* Conditional Keywords **are not** available in Design files.

* Keywords **are not** available in CSS/JS files.  In order to use keywords
  inside either of these, they would need to be inline CSS in a page, use
  declarative HTML attributes for JS (eg `data-*`) or use some weird hack
  involving Page assets, where keywords work.

* Ignore the
  [documentation](https://matrix-manuals.squiz.net/keyword-replacements) when
  it says that non-existent keyword replacements won't be replaced: they're
  just deleted entirely / replaced with an empty string.

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
  * Certain values are already escaped but need to be confirmed by hand as to
    whether they are or aren't.

## Git File Bridges

These allows files to be exposed automatically within Matrix or linked to from
other content areas (such as Web Framework Resources in a page template).

You can generate URLs in the following manner:

    ./?a=239694:dist/css/jcu.min.css

See also [Referencing
Files](https://manuals.matrix.squizsuite.net/git/examples/setting-up-a-git-file-bridge#Referencing-Files)
for more information.  URLs aren't overly user-friendly but content will be
served with the correct content type headers (eg HTML files, images, etc).

Git File Bridges also support use as a webhook endpoint for automatic updating
(such as those used by GitHub or BitBucket).


