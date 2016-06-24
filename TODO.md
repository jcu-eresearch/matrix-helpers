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
