<?php
  // This is an illustration of what a keyword replacement roughly translates
  // to in terms of PHP.
  //
  // See
  // https://matrix-manuals.squiz.net/keyword-replacements/chapters/keyword-modifiers#Using-Keyword-Replacements-as-Argument-Values
  // for a general overview.
?>

<!-- Pseudo-code -->
Use the `empty` function to to test if there's a value for the cover image metadata on this current asset.
If so,
    Get and echo the related asset ID from the asset
else if the metadata is empty:
    Get and echo the related asset ID from the site
End if

<!-- Before -->
%globals_asset_metadata_jcu.features.cover_image^replace_keywords:empty:{globals_site_metadata_jcu.features.cover_image}%

<!-- After -->
<?php echo (isset($keyword_replacements['globals_asset_metadata_jcu.features.cover_image^replace_keywords:empty:{globals_site_metadata_jcu.features.cover_image}'])) ? $keyword_replacements['globals_asset_metadata_jcu.features.cover_image^replace_keywords:empty:{globals_site_metadata_jcu.features.cover_image}'] : ""; ?>
