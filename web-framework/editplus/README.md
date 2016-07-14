## Use and installation

1. Upload `easyedit.css` and `easyedit-webframework.css` into Matrix
   as `CSS File` assets.

1. Create a `CSS File Folder` and associate the two CSS files above with this
   folder.  Enable automatic regeneration on change and basic minification.
   Note the asset ID from this folder.

1. Create a Page asset within Matrix and upload the contents of
   `editplus-nester.html`.

1. Take the asset ID you noted down for the CSS folder and replace the Edit+
   CSS asset reference on line 5.

1. Confirm that the JCU Web Framework is available at the prescribed asset
   location in line 2.

1. Save and note the asset ID of this Page.

1. Ensure that your Design has an Edit+ area present (see
  `editplus-parse.html`).  If not, add this code at the top of your Design file.

1. Create or adjust your Design Customisation and set this Page's asset ID as
   your `nested_EES_code` Design Area.

1. Visit the `/_edit` URL of your final page and ensure that all resources
   load correctly and the Edit+ editor is working fully.

   If you encounter any display issues, report them; additional CSS fixes may
   be required.

