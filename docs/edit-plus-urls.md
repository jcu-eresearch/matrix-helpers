You can see a list of the URLs we originally supported here:

https://matrix-manuals.squiz.net/releases/ees/ees-1081

 URL Controls

    URL/_edit#mode=edit
    URL/_edit#mode=edit&screen=details
    URL/_edit#mode=edit&screen=content
    URL/_edit#mode=edit&screen=metadata
    URL/_edit#mode=edit&screen=workflow
    URL/_edit#mode=edit&screen=linking
    URL/_edit#mode=edit&screen=urls
    URL/_edit#mode=preview
    URL/_edit#mode=preview&screen=details
    URL/_edit#mode=preview&screen=content
    URL/_edit#mode=preview&screen=metadata
    URL/_edit#mode=preview&screen=workflow
    URL/_edit#mode=preview&screen=linking
    URL/_edit#mode=preview&screen=urls
    URL/_edit#mode=preview&show_diff=1
    URL/_edit#mode=preview&show_diff=0


If you have any custom JS plugins then you can also hook into this URL change. See "EasyEditUrlChange" at https://matrix-manuals.squiz.net/edit-plus/chapters/javascript-plugins

That list in the EES 1081 [which corresponded to roughly the Matrix 4.4-4.6 era] hasn't really changed for most assets, apart from a new inclusion or two since then.

Edit Mode:

The supported screens are asset-defined, but generally speaking all assets in the core Edit+ package have these screens:

    Details
    Metadata
    Workflow
    Linking
    URLs
    Analytics (if set up in config)

And these can be used for the "screen" hash value - the canonical values are lowercase but they're not case sensitive.

So "/_edit#mode=edit&screen=URLs" will work just as "...screen=urls" will.

"Content" will only be supported for assets actually with a content screen:

    Standard Page
    News Item
    Custom Form
    Calendar Event

Also Custom Form has an "Emails" screen.

If you use an invalid screen name (eg. if you ask for Analytics but it's not set up correctly), it'll go back to the default screen which is normally "Details".

    If plugins create custom assets:

    If you have custom plugins that add custom assets - or changes the screens available - the above options may be different.

    To work out what you would need to use - the asset screens file has a getConfig() function, and it's the keys of what this function returns that become the valid values for "screen" in the hash.

Preview Mode:

Two hash options supported here:

    show_diff=[0|1] will override the config option for "show differences in preview mode".
    cache=[0|1] will toggle whether _nocache is used in preview mode (by default _nocache is used).

You can also use the "screen" hash option as in Edit Mode but that has no direct effect on Preview Mode - although it will affect which screen you see when you switch back to Edit Mode for the first time.
