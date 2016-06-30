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

## Keywords

* Conditional Keywords **are not** available in Design files.
* There's a lot of keywords in Matrix.  By using the `keywords/master.html` as
  the Parse file for a Design, you can associate this file with any given
  `Asset` to dump all the various keywords to the page.  Now, just search
  through the page to find value you need!

## Security

* To avoid further XSS vulnerabilities, any keywords should utilise the
  `^escapehtml` keyword modifier when being outputted.

  * It is not known at this time whether Design Parse code has an equivalent
    escaping mechanism.
