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

1. Design areas are turned into `echo` PHP code in a `design_file.php` and
   this file is cached.

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
    being seen by the end user.

1. Matrix URL references using `./?a=123456` are resolved

1. Output buffering is turned off and the page is sent to the client.

## Design Customisations

`Design Customisations` fill the slots in the origin `Design`, filling or
overriding the `MySource_AREA`-defined areas in a Design with a change of some
description.  This could 
Are just like macros - overriding the areas in a Design with a change in HTML
or linkage to a different context.  For instance, a Logo could be a design
customisation as it will be customised for a Design.

`Design Customisations` can be applied where and as `Design`s can be: to a
`Site` or any other `Asset` in Matrix.


## CSS Structure

* Create `CSS Design File` when you need to add Matrix references inside it
* Create `CSS File` when you just want static CSS
* See https://matrix-manuals.squiz.net/designs/chapters/css-design-file

## Sites

Create the new Site ``New Child`` -> `Web` -> `Site` and select the Design on
the `Settings screen`. This Design is now applied throughout the site.

## Questions

### Can you set a default for a Design Area?

Defaults are seemingly most easily configured through creating a "default"
`Design Customisation`, applying the defaults for header/footer/etc and then
having further `Design`s extend upon that `Design Customisation`.

There is also the ability to put *some* basic conditions into the original
`Design` parse file through design tags and keywords, but this is yet to be
explored in depth

### What manners in which can logic be included in a `Design` parse file?

* Can we put any logic into the Parse file?  (If, switch, loops?)
