<?php
  // This is an illustration of what PHP code is produced from use of
  // global keywords.  The metadata fields are specified like
  // `example.social.googleplus` and associated with the current Site asset.
  // The $keyword_replacements array is filled prior to executing the code.
  //
  // See
  // https://matrix-manuals.squiz.net/keyword-replacements/chapters/conditional-keywords
  // for a general overview.
?>

<!-- Before -->
%begin_globals_site_metadata_example.social.googleplus%
  <li class="list-inline-item"><a href="%globals_site_metadata_example.social.googleplus%"><span class="sr-only">Google+</span><span class="icon-googleplus" aria-label="Google+ icon"></span></a>
  </li>
%end_globals%

<!-- After -->
<?php if (!empty($keyword_replacements['globals_site_metadata_example.social.googleplus']) && trim($keyword_replacements['globals_site_metadata_example.social.googleplus']) != '') { ?>

  <li class="list-inline-item"><a href="<?php echo (isset($keyword_replacements['globals_site_metadata_example.social.googleplus'])) ? $keyword_replacements['globals_site_metadata_example.social.googleplus'] : ""; ?>"><span class="sr-only">Google+</span><span class="icon-googleplus" aria-label="Google+ icon"></span></a>
  </li>
<?php } // end globals ?>


<!-- Before -->
%begin_globals_site_metadata_example.social.googleplus%
  <b>Show Google+</b>
%else_begin_globals_site_metadata_example.social.twitter%
  <b>Show Twitter</b>
%else%
  <b>None set.</b>
%end_globals%

<!-- After -->
<?php if (!empty($keyword_replacements['globals_site_metadata_example.social.googleplus']) && trim($keyword_replacements['globals_site_metadata_example.social.googleplus']) != '') { ?>

  <b>Show Google+</b>
<?php } else if (!empty($keyword_replacements['globals_site_metadata_example.social.twitter']) && trim($keyword_replacements['globals_site_metadata_example.social.twitter']) != '') { ?>

  <b>Show Twitter</b>
<?php echo (isset($keyword_replacements['else'])) ? $keyword_replacements['else'] : ""; ?>

  <b>None set.</b>
<?php } // end globals ?>
