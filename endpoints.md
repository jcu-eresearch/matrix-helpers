# Useful Matrix endpoints for performing various actions

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
