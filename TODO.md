# Outstanding tasks

* Ongoing: follow up on Squiz Map issues
* **Info banner:** metadata to configure a page/site-based alert (under
  construction, outages, closures etc)
* **Analytics:** connect for Google Analytics into the site
  * Metadata: ability for users to connect their own alternate Analytics profile
* **Favicon** via metadata configuration
* **Google Maps** API via metadata configuration (eg home page is broken)
* **Toolbar:**
  * Add Asset ID to the toolbar
  * Workflow approver interface (how to determine)
  * Show info on hover or tags on page elements (admins? JavaScript?)
    At present, determining where parts of the page come from are impossible
    but we could attach data visually to indicate "this is the header" or
    "this is the background image from metadata"
* **Portlets:**
  * Better name than 'portlets'?
  * Left and right columns shown on pages
  * Adjustable widths of left/centre/right columns (more page metadata)
  * Calculate auto widths based upon presence of left/right? (eg 3-6-3, or
    3-9, 9-3)
  * Partially complete: inherit portlets from the site or parent level
    (see Asset ID #299342)
* **Content:**
  * Content is driven by raw HTML at present (bugs + not complete)
  * Content Container Templates (Metadata + Paint Layouts)
  * For example, 2-column, 3-column, 4-column layouts, cards etc
* Any other things not exposed for customisation in the Metadata
* **Documentation** for how editors use all of this (Sphinx, extend)
  * Add documentation links into metadata schemas

## Issues that need investigation/reporting

* Caching issues: having to shift-reload on the first load of a Site (eg
  Fletcherview)
* Reorder, sort or group WYSIWYG styles for Design (Design -> Styles)
* Clicking the binoculars on Firefox doesn't switch the asset map to something
  on the 'second screen' (eg in the 100-200 group of items)

## Site object (or its metadata!) available in the Design context

In order to successfully use the per-site (or per-asset) metadata, we need the
details available in the Design Tag context.  At present, we only have it in
the keyword context.

These are the current strategies:

* Global keywords can apparently be used in declare_vars areas - can we use
  this to get the site object / site metadata?
* Can we access the site object / metadata through the $ASSET_LINEAGE[0]
  global variable used in some of the .php files?
* Can we use the asset_linage design area to iterate through *just* one of the
  assets, which will be the top-level Site and set this into a variable?
(MySource_DECLARE)?

## Optional HTML/Design areas

We need the ability to turn on and off the areas of the Design based upon Site
metadata.  The above problem precludes this one.

## Collate Matrix snippets

There's a huge amount of boilerplate in each Design in order to make it work.
Let's collate this info here so we can re-use it (and version control it!).
