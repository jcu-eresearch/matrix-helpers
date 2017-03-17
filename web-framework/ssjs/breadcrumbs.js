/* jslint asi: true */
/* globals print, JCU */

JCU.data.frontend_breadcrumbs = '%frontend_asset_metadata_jcu.features.breadcrumbs%'
JCU.data.homepage_breadcrumbs = '%globals_site_index_id^as_asset:asset_metadata_jcu.features.breadcrumbs%'
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
  // If on a content page, we style accordingly
  var theme_css = JCU.data.current_theme === 'content' ? 'jcu-content' : ''
  if (lineage) {
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
