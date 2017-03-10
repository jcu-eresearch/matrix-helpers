/* jslint asi: true */
/* globals print, JCU */

// Relative path to current Site asset (eg empty if at index page)
JCU.data.url_site_path = '%frontend_asset_url_site_path%'
JCU.data.is_homepage = !JCU.data.url_site_path

JCU.data.frontend_id = '%frontend_asset_assetid%'
JCU.data.frontend_breadcrumbs = '%frontend_asset_metadata_jcu.features.breadcrumbs%'
JCU.data.homepage_breadcrumbs = '%globals_site_index_id^as_asset:asset_metadata_jcu.features.breadcrumbs%'
JCU.data.site_breadcrumbs = '%globals_site_metadata_jcu.features.breadcrumbs%'

function JCU_ssjs_debug() {
  JCU.debug = true
}

// Only show breadcrumbs if enabled
  // Special handling for Matrix's odd "frontend" asset keyword representing
  // the Site and not the homepage (index)
if (JCU.data.is_homepage) {
  if (JCU.data.homepage_breadcrumbs === 'true' || JCU.data.homepage_breadcrumbs === 'inherit' && JCU.data.site_breadcrumbs !== 'false' ) {
    JCU.data.breadcrumbs_enabled = true
    if (JCU.debug) {
      print('<!-- Breadcrumbs enabled via homepage or inheritance -->')
    }
  }
} else if (JCU.data.frontend_breadcrumbs === 'true' || JCU.data.frontend_breadcrumbs === 'inherit' && JCU.data.site_breadcrumbs !== 'false') {
    JCU.data.breadcrumbs_enabled = true
    if (JCU.debug) {
      print('<!-- Breadcrumbs enabled via frontend asset or inheritance -->')
    }
}

if (JCU.data.breadcrumbs_enabled) {
  var lineage = JSON.parse("%frontend_asset_linking_lineage^json_encode%")
  if (lineage) {
    print(
      '<div class="container jcu-content">' +
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
