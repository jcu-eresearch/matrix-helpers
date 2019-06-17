## Upgrades


### v5.4.0.3 to v5.5.2.2

Changelog reference: https://matrix.squiz.net/releases/release-notes?format=print&ids=22516,22447,22043,22441,22412,21431,21409,21372,21343,21328,20609,18836,18162,15598,18152,15590,13934,13833,13749,13710,13621,13490,13467,13434,13312,13031,12856,12673,12554,12518,12287,11808,11601,11549,11438#other-features-improvements

#### Things to test

* Home page rendering
* Content page rendering
* Print layouts
* 3-styles of logo layouts
* Embedded content (eg CoTR)
* Edit+ interface
* Meta tags in page head

* SSJS evaluation in general

#### Areas of conflict

* Edit+: as our customised Edit+ is based upon internal implementation details
* SSJS

  * #10733 - SSJS with use of %globals_asset_contents% is executing as a separate thread
  * #11147 - Multiple SSJS blocks rendering depends on existence of empty line in script tag.

* Disabled Password Fields for SAML Users (https://matrix.squiz.net/releases/release-notes?format=print&ids=22516,22447,22043,22441,22412,21431,21409,21372,21343,21328,20609,18836,18162,15598,18152,15590,13934,13833,13749,13710,13621,13490,13467,13434,13312,13031,12856,12673,12554,12518,12287,11808,11601,11549,11438#disabled-password-fields-for-saml-oauth-users) — this will break login via Construct script; switch to using local account with permissions

* Other issues: see our GitHub repo for issue details

#### Of interest

* Metadata Field Morphing:  https://matrix.squiz.net/releases/release-notes?format=print&ids=22516,22447,22043,22441,22412,21431,21409,21372,21343,21328,20609,18836,18162,15598,18152,15590,13934,13833,13749,13710,13621,13490,13467,13434,13312,13031,12856,12673,12554,12518,12287,11808,11601,11549,11438#metadata-field-morphing

* `%asset_url_with_hash%` for Git Bridge assets
https://matrix.squiz.net/releases/release-notes?format=print&ids=22516,22447,22043,22441,22412,21431,21409,21372,21343,21328,20609,18836,18162,15598,18152,15590,13934,13833,13749,13710,13621,13490,13467,13434,13312,13031,12856,12673,12554,12518,12287,11808,11601,11549,11438#new-url-keyword-for-git-bridge-file-assets

* Keyword to List Direct Asset Children
https://matrix.squiz.net/releases/release-notes?format=print&ids=22516,22447,22043,22441,22412,21431,21409,21372,21343,21328,20609,18836,18162,15598,18152,15590,13934,13833,13749,13710,13621,13490,13467,13434,13312,13031,12856,12673,12554,12518,12287,11808,11601,11549,11438#keyword-to-list-direct-asset-children

* `^run_ssjs` with a keyword modifier to execute SSJS in its own thread https://matrix.squiz.net/releases/release-notes?format=print&ids=22516,22447,22043,22441,22412,21431,21409,21372,21343,21328,20609,18836,18162,15598,18152,15590,13934,13833,13749,13710,13621,13490,13467,13434,13312,13031,12856,12673,12554,12518,12287,11808,11601,11549,11438#keyword-modifier-to-execute-server-side-js

* Server Side JavaScript Debugging `?SQ_VIEW_SERVER_JS` query string argument https://matrix.squiz.net/releases/release-notes?format=print&ids=22516,22447,22043,22441,22412,21431,21409,21372,21343,21328,20609,18836,18162,15598,18152,15590,13934,13833,13749,13710,13621,13490,13467,13434,13312,13031,12856,12673,12554,12518,12287,11808,11601,11549,11438#server-side-javascript-debugging

* Edit+ will no longer save the empty `<p></p>` tag — this could break some page layouts
  https://matrix.squiz.net/releases/release-notes?format=print&ids=22516,22447,22043,22441,22412,21431,21409,21372,21343,21328,20609,18836,18162,15598,18152,15590,13934,13833,13749,13710,13621,13490,13467,13434,13312,13031,12856,12673,12554,12518,12287,11808,11601,11549,11438#edit-wysiwyg-editor-improvements

* `globals_user_is_logged_in` keyword now exists

