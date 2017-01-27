# Functions

Okay, these aren't *really* functions because Squiz Matrix can't actually do
what we're doing here.  Essentially, we've got a bunch of stuff that fake
up the ability to be "called" via keywords using whatever we've got at hand.
Here's a breakdown:

## Pages as "Functions"

We use nested GET arguments.  The upshot of which is that you can include
their contents via `%globals_asset_contents:12345^with_get:arg=value%` (if you
want to use the globals scope) or the more exotic
`%asset_assetid^notempty:12345^as_asset:asset_contents^with_get:arg=value` (if
you want/need to use the local scope, such as when you need to refer to local
keywords in keyword modifiers).

## Regex

The Regular Expression objects work as a keyword modifier to strip or
manipulate text accordingly.
