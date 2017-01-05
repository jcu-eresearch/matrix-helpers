# General overview

## HTML sources

The following are the key areas where HTML will "bubble up" and out of Matrix.

* `Design` assets, which are master HTML templates and structure
* `Design Customisations`, which are "concrete" implementations of Designs,
  which fill the "areas" provided in a `Design`.
* `Assets`, such as `Pages`, which feature content or `Asset Listings` which list
  items based upon conditions
* `Content Containers`, which are sections of content within an `Asset`.  They
  can be reused in multiple `Assets` if need be.
* `Paint Layouts`, which control the rendering of `Asset` contents (including
  `Content Containers` themselves)

From an indirect perspective, you also have these aspects playing a part as
well:

* `Metadata Schemas`, which affect the HTML if keywords are configured in any
  of the above areas to reference either an `Asset` metadata or `Site`
metadata

## Getting HTML out of Matrix

Export of Matrix rendered HTML is somewhat possible by way of the
`?SQ_ASSET_CONTENTS` handler, which can potentially act as an API to getting
content out of Matrix without the Design infrastructure being used.  It's
untested at this stage, but you could potentially separate up the header,
footer and so forth into Page content and then use this handler to get their
rendered contents for inclusion elsewhere.

## Design assets (Parse files)

[Design
assets](https://matrix-manuals.squiz.net/designs/chapters/design-asset) are
templates and can contain statements, expressions and slots
(blocks) that may be overridden by Design Customisations.

The Parse File (Design tags) is the language used for including dynamic
content in a Design.  For example parse code, see the [Design
documentation](https://matrix-manuals.squiz.net/designs/appendices/appendix-example-parse-file).
Within Parse you essentially define sections (areas) of the page that should
be filled with some form of content.  This content will typically be
something dynamic from Matrix, such as dynamic CSS URLs, content the user has
created, and so on. In other platforms, these areas are known as blocks or
slots that you'll be filling.

`Design Customisations` are an extension asset to Designs that fills these
areas with something tangible.  For instance, a Design with an `AREA` design tag
configured for the logo would use a `Design Customisation` to configure the logo
for different sites.  Alternatively, the boilerplate provided in this
repository takes a different approach and uses Site Metadata to do the
configuration.  This puts the control in the editor's hands as opposed to
needing a system administrator to continually produce copies of designs every
time a change needs to happen.

## Features

* Designs can utilise Keyword Replacements
* Designs can utilise Global Variables (site_link, site_name, assetid,
  asset_name, etc)
* Designs **cannot use** Conditional Variables. This means logic needs to either
  be shifted to Parse or into Page assets with content.
* Files beneath a Design in Matrix are referenced thus:
  `mysource_files/my-file-name.svg`, and any references will be
  expanded according to the File Reference Method field configured
  on the Design.

## Comments

Comments within Design files look like this, with a special `<!--@@` start and
end tag that tells Matrix to strip this comment from the HTML going to the
client.  This means you and should document your code for future developers
like so:

    <!--@@ Comment goes here @@-->

## Design Tags

`Design Tags` are embedded XML within your HTML parse file.  They're somewhat
equivalent to template statements or expressions in other templating
languages, such as `{% block foo %}` in Jinja2 or `<metal>` in TAL.

For additional documentation, consult the
[reference](https://matrix-manuals.squiz.net/designs/chapters/design-tags) or
the source code located in `core/assets/designs/design_areas/*`, where all
design areas are implemented in Matrix.

* `MySource_AREA`: `Design Areas` are essentially template slots/fillable
  inheritance blocks. Can be more than just HTML and offer some control over
  aspects of the templating process, such as:

  * `declared_vars` which set variables available in a
  `Design` file ([reference
    reference](https://matrix-manuals.squiz.net/designs/chapters/declared-vars-design-area)).
    This design area
  * `request_vars` which allows access to the request's contents (eg `GET`, `POST`
    and `REQUEST` from PHP)
    ([referece](https://matrix-manuals.squiz.net/designs/chapters/request-vars-design-area))
  * `asset_lineage` which allows iteration through the `Asset`'s hierarchy
    ([reference](https://matrix-manuals.squiz.net/designs/chapters/asset-lineage-design-area))
  * If there are any `__global__` `PRINT` directives that don't correspond to
    a Global Variable, the attributes of the current Design (or Design Area)
    are accessed.
  * These can't be nested, so you can use a non-printing `MySource_AREA` to
    achieve roughly the same effect.

* `MySource_SET`: sets variables for a `Design` area (slot)
* `MySource_ASSET`: Looping statement through assets

## Execution order

Firstly, some preparation steps are taken when a Design or Design
Customisation are saved:

1. `mysource_*` file references in a Design Area (or `Design` overall) are
   resolved to `file_path` or `css_path` parse code
   (<https://matrix-manuals.squiz.net/designs/chapters/global-variables#file-path>)
   when the code was saved initially.

   Note that an overall `Design` is a `Design Area` also by way of class
   inheritance within the PHP code.

1. Global keyword replacements inside `declared_vars` design areas are
   resolved (relative to the asset the `Design` is assigned to (eg a Site)).
   It's important to note that this context is *different* from the final
   keyword replacement, which takes place later.

1. Design areas and parse code are turned into `echo` PHP code in a
   `design_file.php` and this file is cached.  You can equate writing
   Parse code to writing PHP that'll be executed later.

1. If there are any `Design Customisations` present, these are generated after
   the main Design PHP file was generated.

Then, upon a request being served by Matrix, the following happens:

1. Output buffering is turned on, meaning all `echo` calls get buffered (see
   `start()` in `core/include/mysource.inc:541`).

1. The `design_file.php` for the Design associated with the current Asset is
   executed via a `require` call, echoing assets and content calls into the
   system's buffer.

  * Conditional keywords in Page content are resolved (but not keywords
    themselves)

1. Keyword replacements originally from the Design parse file or content are resolved

  * Unresolvable keywords are blanked intentionally, which isn't helpful if
    you're trying to develop or debug something. (see `replaceKeyword()` in)
   `core/include/mysource.inc:1140`)

  * Matrix comments `<!--@@ @@-->` are stripped at the end of this step,
    meaning they can be used in any Parse file or content area without them
    being seen by the end user. Make sure that you end the comments correctly;
    if you mix HTML and Squiz comments (like `<!-@@ foo -->`), you'll end up
    losing most of your page content without warning.

1. Matrix URL references using `./?a=123456` are resolved

1. Output buffering is turned off and the page is sent to the client.

## Comparing Parse XML and Keywords

Parse code are the various `<MySource_*>` tags that are embedded solely within
Design assets and are used at a high level to build page templates.  These
tags build a limited subset of PHP and are processed first, before anything
else within a Design file, and committed to the cache in PHP.  When it comes
to request time, these PHP statements are executed first and then only after
the entire HTML for a page has been built do the keywords (both asset-centric or
global, such as `%globals_site_name%`) get resolved.

There are some areas where Parse and Keywords overlap, such as outputting a
site name or asset name.  In short, if you can use Parse, you're likely to get
slightly better performance as the code for laying out the resolver has
already been produced and cached. However, Parse is somewhat limited in the
conditional sense (eg hacks are needed to work around nesting) so you might
need to push your logic out into Page content.  Unfortunately, in Page content
you don't have access to Parse, so you can't check `show_if` conditions like
`logged_in` reliably or `write_access` or `admin_access` (without a incurring
a mega performance hit).

In other non-Design contexts, such as Page assets and content, you'll be
required to use Keywords only.  However, you get the benefit of conditional
keyword statements (eg `%begin_globals_site_name%` / `%end_globals%`), which
don't exist within Design Parse files.

## Design Customisations

`Design Customisations` fill the slots in the origin `Design`, filling or
overriding the `MySource_AREA`-defined areas in a Design with a change of some
description.  This can be essentially thought of as filling the areas in a
Design with some initial HTML (in the case of an initial "customisation") or a
change in HTML or linkage to a different context in further Design
Customisations.  For instance, a Logo could be a design customisation as it
will be customised for a Design.

`Design Customisations` can be applied where and as `Design`s can be: to a
`Site` or any other `Asset` in Matrix.

One key limitation to Designs and Design Customisations is that they require
administrator intervention to modify, extend or create.  By contrast, a
theming approach that uses Site metadata (what eResearch is currently working
on) gives the control to the editors, essentially replacing Design
Customisations with code that directly points to Site metadata instead of
being hard-coded (or hard-configured).

## CSS Structure

* Create `CSS Design File` when you need to add Matrix references inside it
* Create `CSS File` when you just want static CSS
* Create `CSS File Folder`s for performance and linking.  Ensure that you link
  a given CSS file into the file folder's settings page, not just place the
  CSS file under the given folder.
* See https://matrix-manuals.squiz.net/designs/chapters/css-design-file for
  more information.

## Sites

Create the new Site ``New Child`` -> `Web` -> `Site` and select the Design on
the `Settings screen`. This Design is now applied throughout the site.

## Questions

### Can you set a default for a Design Area?

Defaults are most easily configured through creating a "default"
`Design Customisation`, applying the defaults for header/footer/etc and then
having further `Design`s extend upon that `Design Customisation`.

There is also the ability to put *some* basic conditions into the original
`Design` parse file through design tags and keywords, but this is yet fairly
limited and can be prone to bugs with `%global_asset_*%` contexts.

### What manners in which can logic be included in a `Design` parse file?

The short answer is kind-of, but if you're chasing a clear `if` statement,
then you'll be sorely disappointed.

Firstly, it's possible to have some simple "conditional" statements using
Keywords and keyword modifiers (such as `empty` or `eq`).  Think of them like
single-line lambdas.  These quickly get convoluted and incredibly hard to
read.  It's again technically possible to nest keywords and modifiers using
`replace_keywords`, but only so far.  Outputting simple values like CSS
classes or snippets of text is fine, and it's even possible to output full
HTML, but you'll be in all sorts of pain.  In short, they're powerful, but a
mess.

Secondly, you can use a basic if statement in the form of a Design area called
`show_if`.  Directly nesting `show_if` areas isn't possible, but you can use
yet-another-fun-hack in the form of a non-printed Design area which you later
print inside `show_if` area.  For more info, see the [official
documentation](https://matrix-manuals.squiz.net/designs/chapters/show-if-design-area#Nesting-Show-If-Design-Areas).

There's a slightly undocumented feature called `replace_keyword_in_match` in
the `show_if` area (see
`core/assets/system/conditions/condition_types/condition_keyword_regexp/condition_keyword_regexp.inc`)
that allows you to match on resolved keywords.  The setting
is present in the Matrix UI but not documented in XML. The code for this looks
like so:

    <MySource_SET name="condition_replace_keyword_in_match" value="1" />

The value **must be** exactly `1`; no other truthy value will suffice.  See
`parse/show_if.xml` for a fully worked example.  A hidden benefit of this is
that you can check keywords with modifiers, which means that you're
essentially able to compare two different function call results (as
strings/regex). YMMV.

There's also the ability to do some purpose-specific processing, such as for
displaying navigation items from the asset's lineage hierarchy.

This all sums up to a very ambiguous answer of "it depends", because your
condition needs to match the functionality available.  Sadly, access to just
write in PHP is not allowed, which makes life quite difficult.

## Paint Layouts

*Paint Layouts* are templates for assets to control how an asset's **content
body** is displayed within the overall rendered page.  They allow you to add
metadata fields to an asset as well as other information into the rendered
content body in any way that you see fit.

Displaying an asset through the Body Design Area will invoke the default Paint
Layout applied for that asset in the same way that
`%globals_asset_contents:12345%` will as well.  There's actually an
[issue](https://github.com/jcu-eresearch/matrix-helpers/issues/23) open for
this keyword at present but that's beside the point.

Paint Layouts are applied via the `Paint Layouts` screen in the admin
interface.  This requires a system administrator in order to make this change.
In contrast to Metadata Schemas or Permissions, whose settings are applied at
an individual level to each and every Asset, the `Paint Layout` is applied on
a URL-basis and **automatically** cascades to sub-assets beneath that path in
the URL.  So, for instance, the main site is `example.edu.au` and this has a
`Paint Layout` applied.  Any new content added under this structure will
implicitly inherit the same `Layout`.  If a path like `example.edu.au/foo/bar`
then has a new `Paint Layout` applied, any content under
`example.edu.au/foo/bar/*` will get that new `Layout` automatically.

Individual content assets can be rendered using another `Paint Layout` through
`Overrides`, which are applied to just that single `Asset` and not inherited
at all.

## Asset Listings

Asset Listings are a content type within Matrix that allows you to list a set
of assets in a specific manner of HTML.  You are able to customise how the
listing looks (such as `<ul>`, set of `<div>` containers etc) and how the
individual assets are shown (such as `<li>`, `<a>` and so on).  Think of an
Asset Listing as a rather limited for-loop that's centric on assets; it can be
used for navigation, menus and pretty much any other type of listing.  Assets
listed can be a static set list, or dynamically populated based upon some
other form of configuration (such as a GET or POST parameter, keyword,
metadata and so on).

The implementation of Asset Listings is messy and so is their configuration.
You'll need to be extremely patient because trial-and-error is the only way to
proceed.

### Types to List

Unfortunately in Matrix you can't just say "show me all content!" in an Asset
Listing.  Whilst the ability to `Inherit` classes for Asset Types exists,
there's not a value in the asset type drop-down menu for `Asset`, the root
class.  Here's what you'll need to select instead; these are the core
2nd-level classes:

* File
* File Bridge
* Folder
* Form
* Page

and ensure that you select the `Inherit` checkbox for all of these.

If you want less than everything to be listed, use the `Asset Types` tree at
the top-right of the Admin screen (next to `Logout`) to determine what type(s)
you want to show.
