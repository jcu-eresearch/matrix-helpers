# Edit+ for the JCU Web Framework

## Use and installation

1. Upload `easyedit.patched.css` and `easyedit-webframework.css` into Matrix
   as `CSS File` assets.

1. Create a `CSS File Folder` and associate the two CSS files above with this
   folder.  Enable automatic regeneration on change and basic minification.
   Note the asset ID from this folder.

1. Create a Page asset within Matrix and upload the contents of
   `editplus-custom.html`.

1. Take the asset ID you noted down for the CSS folder and replace the Edit+
   CSS asset reference on line 5.

1. Confirm that the JCU Web Framework is available at the prescribed asset
   location in line 2.

1. Save and note the asset ID of this Page.

1. Ensure that your Design has an Edit+ area present..  If not, see
   <https://matrix.squiz.net/manuals/edit-plus/chapters/edit-plus-installation-guide>

1. Create or adjust your Design Customisation and set this Page's asset ID as
   your `editplus_custom` Design Area.

1. Visit the `/_edit` URL of your final page and ensure that all resources
   load correctly and the Edit+ editor is working fully.

   If you encounter any display issues, report them; additional CSS fixes may
   be required.

## Upgrades and re-patching

1. Obtain a new copy of `easyedit.min.css` from the server.
1. Unminify this file using <http://unminify.com/> and store as `easyedit.css`
1. Remove all reset rules from easyedit.css (usually up to the `.ir` selector)
   and including the `a, a:visited` selector.
1. Remove all rules for `[something] .content_type_wysiwyg [something]` from `easyedit.css`,
   except for:

  * `.plus .content_type_wysiwyg .bodycopy_content`
  * `.plus .content_type_wysiwyg`
  * Rules with `.sq-illegal-*` in them

1. Remove all rules for `.plus .bodycopy_content [something]` from `easyedit.css`
1. Append `/__data/ees/` to all URLs in the file.  For Vim users, try:

       %s#url(#url(/__data/ees/#g

1. Save this file as `easyedit.patched.css` and upload to Matrix.

1. Try Edit+ and confirm whether any additional fixes are required to
   integrate with the Web Framework.  These should be placed into
   `easyedit-webframework.css` for ease of visibility and separation.

1. Commit results to repository.

1. If necessary, update our Edit+ list of icons by running (in this
   directory):

       ../../scripts/icon_json.py path/to/webhostinghub-glyphs/config.json > webhostinghub-glyphs.json

   You may also need to update the ID of the icon JSON at:

       var iconJsonAssetId = '413526'



