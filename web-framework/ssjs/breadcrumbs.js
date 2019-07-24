/* jslint asi: true */
/* globals print, JCU */

JCU.data.frontend_breadcrumbs = '%frontend_asset_metadata_jcu.features.breadcrumbs%'
JCU.data.homepage_breadcrumbs = '%globals_site_index_id^as_asset:asset_metadata_jcu.features.breadcrumbs%'
JCU.data.site_breadcrumbs = '%globals_site_metadata_jcu.features.breadcrumbs%'

// Only show breadcrumbs if enabled (or if inherit all the way up)
JCU.data.breadcrumbs_enabled = JCU.resolveBooleanInheritance({
  homepage_data: JCU.data.homepage_breadcrumbs,
  frontend_data: JCU.data.frontend_breadcrumbs,
  site_data: JCU.data.site_breadcrumbs,
  default: true
})

if (JCU.data.breadcrumbs_enabled) {
  var lineage = JSON.parse("%frontend_asset_linking_lineage^json_encode%")
  // If on a content page, we style accordingly
  var theme_css = JCU.data.current_theme === 'content' ? 'jcu-content' : ''

  if (JCU.debug) {
    print('<!-- Breadcrumbs enabled via current settings -->')
  }
  if (lineage) {
    print(
      '<div class="container breadcrumb-wrapper ' + theme_css + '">' +
      '  <nav aria-label="Breadcrumb">' +
      '    <ol class="breadcrumb jcu-bg--transparent">'
    )
    lineage.forEach(function(id) {
      if (id === JCU.data.site_id) {
        print('<li class="breadcrumb-item"><a class="text-muted" href="%globals_asset_url:' + id + '%" title="%globals_asset_short_name:' + id + '^striphtml%"><span class="icon-home" aria-hidden="true"></span><span class="sr-only">Go home to %globals_asset_short_name:' + id + '^striphtml%</span></a></li>')
      } else if (id !== JCU.data.frontend_id) {
        print('<li class="breadcrumb-item"><a href="%globals_asset_url:' + id + '%">%globals_asset_short_name:' + id + '^striphtml%</a></li>')
      } else {
        print('<li class="breadcrumb-item active" aria-current="page"><a class="text-muted" href="%globals_asset_url:' + id + '%">%globals_asset_short_name:' + id + '^striphtml%</a>')
      }
    })
    print(
      '    </ol>' +
      '  </nav>' +
      '</div>'
    )
  }
}
