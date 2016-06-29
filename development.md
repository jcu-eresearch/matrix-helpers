# Development Practices

Development in Matrix is very manual: you need to use your web browser,
version control is a myth, testing is by hand and dev is pretty much just
trial and error.  Here's a few suggestions to help.

## General

* The administrative backend is accessible by appending `/_admin` to the URL
  of any Asset.
* The Edit+ interface (for content editors and easier uploading of multiple
  Assets) is accessible by appending `/_edit` to the URL of any Asset.

## Metadata

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
