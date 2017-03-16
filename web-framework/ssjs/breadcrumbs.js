/* jslint asi: true */
/* globals print, JCU */

// Relative path to current Site asset (eg empty if at index page)
// Workaround for https://github.com/jcu-eresearch/matrix-helpers/issues/9
JCU.data.url_site_path = '%frontend_asset_url_site_path%'
JCU.data.is_homepage = !JCU.data.url_site_path

JCU.data.frontend_id = '%frontend_asset_assetid%'
JCU.data.frontend_breadcrumbs = '%frontend_asset_metadata_jcu.features.breadcrumbs%'
JCU.data.frontend_theme = '%frontend_asset_metadata_jcu.features.theme%'
JCU.data.homepage_breadcrumbs = '%globals_site_index_id^as_asset:asset_metadata_jcu.features.breadcrumbs%'
JCU.data.homepage_theme = '%globals_site_index_id^as_asset:asset_metadata_jcu.features.theme%'
JCU.data.site_breadcrumbs = '%globals_site_metadata_jcu.features.breadcrumbs%'

// Only show breadcrumbs if enabled
if (JCU.data.is_homepage) {
  // Special handling for Matrix's odd "frontend" asset keyword representing
  // the Site and not the homepage (index)
  if (JCU.data.homepage_breadcrumbs === 'true' || JCU.data.homepage_breadcrumbs === 'inherit' && JCU.data.site_breadcrumbs !== 'false' ) {
    JCU.data.breadcrumbs_enabled = true
    if (JCU.debug) {
      print('<!-- Breadcrumbs enabled via homepage or inheritance -->')
    }
  }
} else if (JCU.data.frontend_breadcrumbs === 'true' || JCU.data.frontend_breadcrumbs === 'inherit' && JCU.data.site_breadcrumbs !== 'false') {
  // If it's just a standard asset
  JCU.data.breadcrumbs_enabled = true
  if (JCU.debug) {
    print('<!-- Breadcrumbs enabled via frontend asset or inheritance -->')
  }
}

if (JCU.data.breadcrumbs_enabled) {
  var lineage = JSON.parse("%frontend_asset_linking_lineage^json_encode%")
  var theme_css = ''
  if (lineage) {
    // If on a content page, we style accordingly
    if (JCU.data.is_homepage && JCU.data.homepage_theme === 'content' ||
        !JCU.data.is_homepage && JCU.data.frontend_theme === 'content') {
      theme_css = 'jcu-content'
    }
    print(
      '<div class="container ' + theme_css + '">' +
      '<nav class="breadcrumb jcu-bg--transparent">')
    lineage.forEach(function(id) {
      if (id !== JCU.data.frontend_id) {
        print('<a class="breadcrumb-item" href="%globals_asset_url:' + id + '%">%globals_asset_short_name:' + id + '%</a>')
      } else {
        print('<span class="breadcrumb-item active">%globals_asset_short_name:' + id + '%</span>')
      }
    })
    print(
      '</nav>' +
      '</div>')
  }
}
