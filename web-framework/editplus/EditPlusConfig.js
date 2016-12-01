/**
 *  Easy Edit Suite configuration options.
 *  This is an example, options may vary per EES implementation.
 *  More help on EES install and implementatuon can be found at http://manuals.matrix.squizsuite.net/ees/chapters/installation/
 */
var EasyEditConfig = {

    // Internal debugging flag. Setting this value to true will log debugging data
    // to the console in browsers that support console.log.
    // Quietly ignored in browsers that do not support console.log.
    debug:                      false,

    // The title bar that is displayed for EES.
    // @asset_name@ is a dynamic replacement for the current assets name.
    titleBar:                   "@asset_name@ : James Cook University Edit+",

    // Lock refresh interval in seconds.
    // EES automatically refreshed all locks for an asset based on this value.
    lockRefreshInterval:        120,

    // Array of base site urls. (Replaces 'eesSiteURL' global variable from EES builds 832 and 833)
    // For the majority systems, this can stay empty.
    // If required, the array of URLs should match up with urls applied in the Squiz Matrix system configuration.
    // If this is left empty or EES is installed on a site url that doesn't match a base site url then
    // a domain relative url will be used.
    baseSiteUrls: [],

    // JS API configuration options.
    // Populate with the API key found on the EES related JS API details screen.
    JSAPI: {
        key:                    "1881698051"
    },

    // Cascade status change threshold.
    // If a user selects 'Cascade Status Change' on the Details Screen and the
    // total number of child assets exceeds this value they will be
    // presented with a prompt to continue or to return to the screen.
    cascadeThreshold:           4,


    // Timeout to show a warning for overlays that are active for more than X number of
    // seconds. This is usually because of an ajax function that has for whatever
    // reason failed to return successfully and could indicate server error.
    overlayTimeout:             180,


    // PERFORMANCE FEATURE.
    // The default mode to use on initial load. Can be 'edit' or 'preview'.
    // Can be overridden in the url by using the hash #mode=mode_name e.g. #mode=preview.
    // If missing from config defaults to edit mode.
    defaultMode:                'edit',

    // Default screen to use on initial edit mode load.
    // Can be overridden in the url by using the hash #screen=screen_name e.g. #screen=content.
    // If missing from config defaults to details screen.
    defaultScreen:              'details',

    // Should the ?SQ_ACTION=diff flag be used in preview mode?
    // If missing from config or set to false preview mode will require
    // user interaction with the 'Compare to Live' button.
    showDifferencesInPreviewMode: false,

    // PERFORMANCE FEATURE.
    // Cache the asset finder results. If missing from config or false defaults to no cache.
    assetFinderCacheEnabled:      true,

    // Array of additional asset finder locations.
    // This can be used to add asset id's of frequently used site parents e.g. News, Events, Images.
    assetFinderLocations:         [364590,283019,2311,70],

    // PERFORMANCE FEATURE.
    // Maximum number of assets to show in an asset finder panel before
    // pagination occurs.
    // If missing from config pagination will default to 100.
    // 0 = no pagination.
    assetFinderMaxAssets:         100,

    // PERFORMANCE FEATURE.
    // Cache manager default expiry, minutes expressed as a whole number.
    cacheManagerDefaultExpiry:    2,

    // Show 'Set Thumbnail' section on details screen.
    // Adds the ability to add/remove/update a thumbnail to all assets.
    // If missing from config thumbnail will show by default, set to false to hide.
    useThumbnail:                true,

    // Display and allow editing of future statuses via the details screen.
    // If missing from config or false the details screen will not display 'Show Future Status'.
    allowFutureStatusChange:     true,

    // PERFORMANCE FEATURE.
    // Display a list of direct children on the link screen.
    // If missing from config or false the linking screen will not display 'Direct Children'.
    showChildrenOnLinkingScreen: true,

    //GOOGLE ANALYTICS CONNECTOR
    // A new Analytics screen will be made available for your assets, displaying the analytics data of your assets.
    analyticsViewId:             318119,

    // SITE EDITING (for Matrix 5.4)
    // This option allows you to enable the editing of Site Assets within Edit+.
    enableSiteEditing:           true

}; // End EasyEditConfig.
