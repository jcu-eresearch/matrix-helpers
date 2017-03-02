/* jslint asi: true */
/* globals _, print, JCU */

// Only show breadcrumbs if enabled and on pages that aren't the homepage
JCU.data.site_index_id = '%globals_site_index_id%'
JCU.data.site_breadcrumbs = '%globals_site_metadata_jcu.features.breadcrumbs%'
JCU.data.frontend_id = '%frontend_asset_assetid%'  // This should be corrected for index pages
JCU.data.frontend_breadcrumbs = '%frontend_asset_metadata_jcu.features.breadcrumbs%'

if (JCU.data.frontend_breadcrumbs === 'true' ||
    JCU.data.frontend_breadcrumbs === 'inherit' && JCU.data.site_breadcrumbs) {
  if (JCU.data.site_index_id !== JCU.data.frontend_id) {
    var lineage = JSON.parse("%frontend_asset_linking_lineage^json_encode%")
    if (lineage) {
      print(
        '<div class="container jcu-content">' +
          '<nav class="breadcrumb jcu-bg--transparent">')
      _.each(lineage, function(id) {
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
}
