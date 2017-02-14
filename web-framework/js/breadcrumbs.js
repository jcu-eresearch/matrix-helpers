/* jslint asi: true */
/* globals _, print, data */

// Only show breadcrumbs if enabled and on pages that aren't the homepage
data.site_index_id = '%globals_site_index_id%'
data.site_breadcrumbs = '%globals_site_metadata_jcu.features.breadcrumbs%'
data.frontend_id = '%frontend_asset_assetid%'  // This should be corrected for index pages
data.frontend_breadcrumbs = '%frontend_asset_metadata_jcu.features.breadcrumbs%'

if (data.frontend_breadcrumbs === 'true' ||
    data.frontend_breadcrumbs === 'inherit' && data.site_breadcrumbs) {
  if (data.site_index_id !== data.frontend_id) {
    var lineage = %frontend_asset_linking_lineage%
    if (lineage) {
      print(
        '<div class="container jcu-content">' +
          '<nav class="breadcrumb jcu-bg--transparent">')
      _.each(lineage, function(id) {
        if (id !== data.frontend_id) {
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
