/* jslint browser: true, jquery: true, asi: true */
/* globals EasyEdit, EasyEditConfig, EasyEditEventManager, EasyEditAssetManager, EasyEditComponentsToolbar, EasyEditOverlay, EasyEditBodycopyManager */

// Easy Edit Suite configuration options.
EasyEditConfig.debug = false
EasyEditConfig.titleBar = "@asset_name@ : James Cook University Edit+"
EasyEditConfig.overlayTimeout = 61
// Research Infrastructure, Web Framework, Australia, Singapore
EasyEditConfig.assetFinderLocations = [364590,283019,2311,70]
EasyEditConfig.assetFinderMaxAssets = 100
EasyEditConfig.allowFutureStatusChange = true
EasyEditConfig.mandatoryWorkflowLog = false
EasyEditConfig.showChildrenOnLinkingScreen = true
// Must leave enabled; see https://github.com/jcu-eresearch/matrix-helpers/issues/56
EasyEditConfig.contextsEnabled = true
EasyEditConfig.markdownEnabled = true
EasyEditConfig.enableSiteEditing = true
EasyEditConfig.analyticsViewId = 318119

// Edit+ Plugins
// See https://matrix.squiz.net/manuals/edit-plus/chapters/javascript-plugins for details

/**
  * Open Asset Wizard plugin - Automatically opens the Asset Wizard via the URL
  */
EasyEdit.plugins.openAssetWizardViaUrl = {
  init: function() {
    EasyEditEventManager.bind('EasyEditAfterLoad', function() {
      if (window.location.hash.startsWith('#openWizard')) {
        EasyEdit.wizard.show()
      }
    })
  }
}

/**
  * User menu plugin - Adds extra buttons to the user toolbar
  */
EasyEdit.isBackendUser = function() {
  return EasyEditAssetManager._currentUserAsset.attr.type.search(/Backend|System|Root/) >= 0
}
EasyEdit.plugins.addUserMenuButtons = {
  init: function() {
    EasyEditEventManager.bind('EasyEditBeforeLoad', function() {
      var oldFn = EasyEditComponentsToolbar.addCurrentUser
      EasyEditComponentsToolbar.addCurrentUser = function() {
        var buttons = '<div role="group" class="m-l-1 btn-group btn-group-sm">'
        if (EasyEdit.isBackendUser()) {
          buttons += '<a href="' + EasyEdit.getURL().url + '/' + EasyEdit.systemInfo.suffixes.admin + '" title="Go to Admin mode" class="btn btn-secondary"><span aria-label="Admin icon" class="icon-pagesetup"></span></a>'
        }
        buttons += '<a href="' + EasyEdit.getURL().url + '" class="btn btn-secondary" title="Go to public view" target="_blank"><span class="icon-eye" aria-label="View icon"></span></a><a class="btn btn-secondary" href="https://www.jcu.edu.au/digital-marketing/" target="_blank" title="Get help from a human"><span class="icon-support" aria-label="Help icon"></span></a>'
        buttons += '</div>'
        return $(oldFn()).append(buttons)[0].outerHTML
      }
    })
  }
}

/**
* Hotfix Plugin - Fixes various EasyEdit bugs
*/
EasyEdit.plugins.fixBugs = {
  init: function () {
    // Bug fix: fix display issues on Preview mode
    EasyEditEventManager.bind("EasyEditModeLoaded", function (mode) {
      if (mode === "preview") {
        // Handle resize actions adding overflow: auto the iframe by
        // overriding the start() function. Other functions remain the same.
        jQuery("#ees_PreviewFrameContainer").resizable({
          start: function() {
            jQuery("#ees_modePreviewFrame").css("pointer-events", "none")
            EasyEditComponentsToolbar.deselectPreviewScreenSizeOption()
          }
        })

        // The Edit+ code is at fault in two areas, setting the wrapper
        // height to the height of iframe body. From easyedit.js:
        // Line 20478 jQuery("div", $iFrameBody).length > 0 ? n.height($iFrameBody.height() + 40 + "px") : n.height(jQuery(window).height() + "px");
        // Line 25159 c = jQuery("div", c).length > 0 ? c.height() + 40 : jQuery(window).height();
        var correctIframeWrapperHeight = function() {
          // Get rid of overflow: hidden from the preview iframe's HTML tag
          var iframe = document.getElementById('ees_modePreviewFrame')
          var iframeDocument = iframe.contentDocument || iframe.contentWindow.document
          iframeDocument.documentElement.removeAttribute('style')

          // Corrects the iframe wrapper height
          document.getElementById('ees_PreviewFrameContainer').style.height =
            window.innerHeight - document.getElementById('ees_toolBar').scrollHeight + 'px'
        }
        if (sessionStorage.getItem("preview_screen_size") === "auto") {
          correctIframeWrapperHeight()
        }
        jQuery('#ees_selectedSize_0').click(function() {
          correctIframeWrapperHeight()
        })
      }
    })
  }
}

/**
  * CSS loader animation plugin - Avoid using a huge animated GIF, use CSS3!
  */
EasyEdit.plugins.cssLoaderAnimation = {
  init: function () {
    // Change the loader to be lighter
    EasyEditOverlay.overlays.loading._getTemplate = function(msg) {
      var output = "<div class='spinner'></div>"
      if (msg) {
          output += "<p class='h2 text-xs-center'>" + msg + "</p>"
      }
      return output
    }
  }
}

/**
  * Content Container Template plugin: warn if attempting to change template!
    Also fix issue where template `<select>` only reflects original value
  */
EasyEdit.plugins.contentContainerTemplateWarning = {
  init: function () {

    EasyEditEventManager.bind("EasyEditScreenLoad", function () {
      if (typeof EasyEditBodycopyManager !== "undefined") {
        // Warn the user if they try and set a template
        var oldFn = EasyEditBodycopyManager.prototype.editPropertiesPopup

        // `this`: the EasyEditBodycopyManager
        // `a`: the a.bodycopy-properties link that triggered the popup
        // `b`: the tooltip identifer div index from this.bodycopies (eg first is `1`)
        EasyEditBodycopyManager.prototype.editPropertiesPopup = function(a, b) {
          var bodycopyDiv = this.getDivByPosition(b)
          var button = a
          var returnValue = oldFn.apply(this, arguments)
          jQuery('#edit_properties_ok_' + bodycopyDiv.id).click(function () {
            if (jQuery('#template_' + bodycopyDiv.id).val().replace("--", "") !== bodycopyDiv.attribute("applied_template").toString()) {
              if (!button.parents('.bodycopy_manager_div').prev().is('.template-alert')) {
                button.closest('.bodycopy_manager_div').before('<div class="container m-y-1 template-alert"><div class="alert alert-warning" role="alert"><strong>Warning!</strong> Changing content templates may result in your current settings being inaccessible or unused in that new template. Take a copy of any settings in a text editor (such as Notepad) if you need them later.</div></div>')
              }
            }
          })
          return returnValue
        }
      }
    })
  }
}

/**
  * Colour picker fields: add a helpful colour picker if the field description contains
    any element matching `.tool.tool-colorpicker`
  */
EasyEdit.plugins.colorPickerFields = {
  init: function () {

    EasyEditEventManager.bind("EasyEditScreenLoad", function () {
      $.getScript('https://cdnjs.cloudflare.com/ajax/libs/tinyColorPicker/1.1.1/jqColorPicker.min.js', function() {
        $('.sq-metadata-description > .tool.tool-colorpicker').closest('.row').find('input[id*=metadata_field][type=text]').colorPicker({
          // Plugin: shows input fields for rgb and hsv; changeable
          animationSpeed: 0,
          buildCallback: function($elm) {
            var colorInstance = this.color,
              colorPicker = this

            $elm.prepend('<div class="cp-panel">' +
              'R <input type="text" class="cp-r"><br>' +
              'G <input type="text" class="cp-g"><br>' +
              'B <input type="text" class="cp-b"><hr>' +
              'H <input type="text" class="cp-h"><br>' +
              'S <input type="text" class="cp-s"><br>' +
              'B <input type="text" class="cp-v"><hr>' +
              '<div class="cp-HEX-wrapper"># <input class="cp-HEX" maxlength="6" type="text"></div>' +
            '</div>').on('change', 'input', function() {
              var value = this.value,
                className = this.className,
                type = className.split('-')[1],
                color = {}

              color[type] = value
              colorInstance.setColor(type === 'HEX' ? value : color,
                type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv')
              colorPicker.render()
              this.blur()
            })
            var defaultCheckbox = $elm.closest('.row').find('.sq-form-field.defaultCheckbox')
            if (defaultCheckbox) {
              defaultCheckbox.change(function() {
                $elm.trigger('change')
              })
            }
          },
          cssAddon:
            '.cp-color-picker{box-sizing:border-box; width:226px;}' +
            '.cp-color-picker .cp-panel {line-height: 21px; float:right;' +
              'padding:0 1px 0 8px; margin-top:-1px; overflow:visible}' +
            '.cp-xy-slider:active {cursor:none;}' +
            '.cp-panel, .cp-panel input {color:#bbb; font-family:monospace,' +
              '"Courier New",Courier,mono; font-size:12px; font-weight:bold;}' +
            '.cp-panel input {width:28px; padding:2px 3px 1px;' +
              'text-align:right; line-height:12px; background:transparent;' +
              'border:1px solid; border-color:#222 #666 #666 #222;}' +
            '.cp-panel hr {margin:0 -2px 2px; height:1px; border:0;' +
              'background:#666; border-top:1px solid #222;}' +
            '.cp-panel .cp-HEX-wrapper {width:70px; position:absolute; left: -18px;}' +
            '.cp-panel .cp-HEX {width:54px;}' +
            '.cp-alpha {width:128px;}',
          renderCallback: function() {
            var colors = this.color.colors.RND,
              modes = {
                r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
                h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
                HEX: this.color.colors.HEX
              }
            $('input', '.cp-panel').each(function() {
              this.value = modes[this.className.substr(3)]
            })
            EasyEditComponentsToolbar.enableSaveButton()
          }
        })
      })
    })
  }
}
