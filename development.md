# Development Practices

Development in Matrix is very manual: you need to use your web browser,
version control is a myth, testing is by hand and dev is pretty much just
trial and error.  Here's a few suggestions to help.

## Metadata

* Enabling `Show on Frontend` for metadata schemas will result in the fields
  being echoed into the `<head>` the resulting rendered page as `<meta>` tags.
* In order to ease development, don't turn this option off until you're
  finished.  Matrix doesn't have any discernible way of printing *all*
  metadata so this is as close as it gets.
* Your Design needs to have the `parse/metadata.xml` snippet in place.
* For ease of namespacing and avoiding conflict, metadata schema fields should
  be formatted in a manner such as `org.site.logo`, with dots delimiting
  namespaces.  Change `org` to be your own organisation's identifier.

## Keywords

* Conditional Keywords **are not** available in Design files.
* There's a lot of keywords in Matrix.  By using the `keywords/master.html` as
  the Parse file for a Design, you can associate this file with any given
  `Asset` to dump all the various keywords to the page.  Now, just search
  through the page to find value you need!

