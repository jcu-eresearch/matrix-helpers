Web Framework folder
 -> Designs folder
   -> Design asset
     -> Edit the Parse file (page template) to add statements/expressions to
control the HTML output

## Parse file

In this template, use the Boilerplate provided by Matrix in several key areas.
These snippets are included in the `design_boilerplate/` folder in this
repository for convenience:

* Edit+
* Metadata
* …

## Types

* Asset listings
* Content containers


## Design Tags

`Design Tags` are embedded XML within your HTML parse file.  They're somewhat
equivalent to template statements or expressions in other templating
languages, such as `{% block foo %}` in Jinja2 or `<metal>` in TAL.

Reference: https://matrix-manuals.squiz.net/designs/chapters/design-tags

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

* `MySource_SET`: sets variables for a `Design` area (slot)
* `MySource_ASSET`: Looping statement through assets

URLs: `mysource_files/*` reference files underneath the Design itself.

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
* See https://matrix-manuals.squiz.net/designs/chapters/css-design-file

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

There's also the ability to do some purpose-specific processing, such as for
displaying navigation items from the asset's lineage hierarchy. 

* Can we put any logic into the Parse file?  (If, switch, loops?)
