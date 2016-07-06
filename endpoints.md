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
