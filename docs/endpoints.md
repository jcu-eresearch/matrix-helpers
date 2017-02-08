# Useful Matrix endpoints for performing various actions

## Appends

Append any of these URLs to an Asset URL to have an effect.
The URLs might change based upon the configuration located in
`core/include/system_config.inc`.

* `/_admin` for administrative UI access. On the JCU site, hit this URL when
  logged out to be prompted for a standard Matrix login form.  Need Admin
  permission and must be a Backend User to access this.
* `/_edit` for Edit+ access (for editor users). Must have Edit access and be a
  Simple Edit User.

  * `/_edit?SQ_BACKEND_PAGE=main#mode=edit&screen=content` will take you
    directly to the screen in Edit+. You can substitute `content` for any
    other screen name, including `details`, `metadata`, `workflow`, `linking`,
    `urls` or `analytics` (if configured).
  * On any page that tries to use CSS to *hide* an edit screen, use the direct
    link to access it.

* `/_login` to simply prompt for login. Must be a User.
* `/_nocache` for preventing caching on the given page load; available to the
  Public.
* `/_noproxycache` for preventing proxy caching on the given page load;
  available to the Public.
* `/_recache` for causing Matrix to re-cache the given page; available to the
  Public.
* `/_performance` for testing page performance; requires the current user to
  be a Backend User (eg an admin).  The following URLs are used internally
  within performance testing display frames:

  * `/_performance_timing`
  * `/_performance_result`

* `?SQ_ASSET_CONTENTS` or `?SQ_ASSET_CONTENTS=123,234` gets the current
  Asset's contents without any surrounding design.
* `?SQ_ASSET_CONTENTS_RAW` or `?SQ_ASSET_CONTENTS_RAW=123,234` gets the
  current Asset's contents without any design or paint layout.
* `?SQ_ASSET_CONTENTS=123&SQ_PAINT_LAYOUT=456` or
  `?SQ_ASSET_CONTENTS=123&SQ_PAINT_LAYOUT_NAME=mylayout` for getting the
  current asset contents using a specific paint layout.

## Assets

* `/?a=12345` gets a given asset for the specified ID
* `/__lib/web/connectivity.php?connect_url=http://google.com` gets the remote
  server to perform a request to the given URL and return either 1 for able to
  connect or 0 for failed.
* `/__lib/web/popups/keyword_extraction.php?assetid=123456` outputs search
  keywords for any given asset ID
* `/__lib/web/popups/print_limbo_keywords.php?asset_type=design` lists all
  keywords for a given asset type for Simple Edit (unsure where used yet)
* `/_web_services/edit.js` is the JavaScript API endpoint
* `/__data/assets/js_file/0013/3433/EditPlusConfig.js` contains the Edit+
  configuration and API keys.

## CSRF

* Access the CSRF token directly via `/?SQ_ACTION=getToken` from any URL.
  This is a potential security risk if editors are untrusted or there are any
  locations where an untrusted user can inject HTML.

## Designs

* `/?SQ_ACTION=set_design_name&SQ_DESIGN_NAME=test` will set the design name
  permanently (well, into your $_SESSION) so you can browse an entire site or
  elsewhere without needing to append `?SQ_DESIGN_NAME=test` to a given page
  load.
* `/?SQ_ACTION=clean_design_name` will clear the $_SESSION of your
  `SQ_DESIGN_NAME` variable

## Backtraces

`/_admin/?SQ_BACKEND_PAGE=main&backend_section=am&am_section=add_asset&parent_assetid=281446&pos=-1&type_code=file&link_type=1&asset_ei_screen=details&sq_link_path=&sq_asset_path=`

## Documentation

See <https://www.jcu.edu.au/documentation> for details on how to maintain
content within the environment that has been configured by Squiz for JCU.

## Locking

http://matrixdemo.squiz.net/_admin/?SQ_BACKEND_PAGE=header&current_assetid=65&sq_lock_type=lookups&sq_popups_blocked=1
