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
