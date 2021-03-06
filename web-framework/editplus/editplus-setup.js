/* jslint browser: true, jquery: true, asi: true */
/* globals EasyEdit, EasyEditConfig, EasyEditEventManager, EasyEditAssetManager, EasyEditComponentsToolbar, EasyEditOverlay, EasyEditBodycopyManager, EasyEditImageEditor, EasyEditLocalise, EasyEditComponents, EasyEditScreens, Viper */

// Easy Edit Suite configuration options.
EasyEditConfig.debug = false
EasyEditConfig.titleBar = "@asset_name@ : James Cook University Edit+"
EasyEditConfig.cascadeThreshold = 10
EasyEditConfig.overlayTimeout = 180
EasyEditConfig.defaultScreen = 'content'
// Web Framework Sites, Web Framework Resources, Australia, Singapore
EasyEditConfig.assetFinderLocations = [364590,283019,2311,70]
EasyEditConfig.assetFinderMaxAssets = 100
EasyEditConfig.allowFutureStatusChange = true
EasyEditConfig.mandatoryWorkflowLog = false
EasyEditConfig.showChildrenOnLinkingScreen = true
// This must remain enabled as Squiz refuse to fix
// https://github.com/jcu-eresearch/matrix-helpers/issues/56
EasyEditConfig.contextsEnabled = true
EasyEditConfig.markdownEnabled = true
EasyEditConfig.enableSiteEditing = true
// Disabled for now until we get an analytics view asset again
//EasyEditConfig.analyticsViewId = 318119

// Localisation of certain strings
EasyEditLocalise.language = 'en'
EasyEditLocalise.translations.en = {
  strings: {
    // General UI
    "Context Switcher": "Language Switcher",
    "Change Context": "Change Language",
    "Changing context to %1": "Changing language to %1",
    "Metadata": "Settings",

    // Creation Wizard
    "Standard Page": "Page",
    "Standard Pages": "Pages",
    "News Item": "Media Release",
    "News Items": "Media Releases",
    "A News Item allows you to add articles to your site. These articles could be anything from a media release to a general article on your site.": "A Media Release allows you to add an article to your site; usually only for use by Media and Communication.",
    "Show in menu?": "Show in Navigation",
    "This option will affect all link locations": "Choose whether this asset should be shown in navigation in all linked locations.",
    "Select the locations to create this asset under": "Select a location for this new asset. It will be created beneath your selection.",
    "Alt Text": "Alternate Text",
    "The text to be used in the Alt attribute of the IMG tag": "Provide a textual description of this image.  This is used for accessibility purposes, such as screen readers.",
    "The text to be used in the Alt attribute of the IMG tag. If decorative, leave this field empty.": "Provide a textual description of this image.  This is used for accessibility purposes, such as screen readers.",
    "Some text to be associated with the image and can be accessed and printed out separately if required.": "Some text to be associated with the image. This and can be accessed and printed out separately if required.",

    // Details pane
    "Cascade Status Change": "Cascade status change to children",
    "Page Name": "Page Name (used as title/header)",
    "Page Short Name": "Page Short Name (used in navigation)",
    "Related Image": "Related Image (Thumbnail)",
    "URL to link to, including URI scheme (for example, http://www.squizsuite.net/).": "URL to link to, including the protocol (for example, https://www.jcu.edu.au/). This takes precedence over linking to an asset.",
    "Select an asset to link the user to.": "Select an asset to link to.",

    // Contents pane
    "Insert New Container": "Add New Content Block",
    "Edit Container Properties": "Edit Content Block",
    "Re-order Content Containers": "Re-order Content Blocks",
    "Styling": "Wrapper HTML",
    "Presentation": "Element",
    "CSS class": "CSS Classes (space separated)",
    "Are you sure you want to delete this container?": "Are you sure you want to delete this Content Block? This action is permanent and cannot be undone.",

    // Linking pane
    "Show in Menu": "Show in Navigation",
    "Add Remaps?": "Automatically add redirections on path change?",
    'When set to "%1", this option will add remaps for Web Paths that have been changed above.': 'When set to "%1", this option will create redirections for users accessing the old Web Paths to the new path. Leave this set to "%1" to ensure old URLs will continue to work.',
    "Content items marked for deletion will be moved to the trash when you click the save button.": "This content asset is marked for deletion and will be moved to the Trash when you click the <strong>Save</strong> button above. This cannot be undone without Administrator assistance.",

    // Analytics pane
    "1": "1 month",
    "3": "3 months",
    "6": "6 months"
  }
}


// Edit+ Plugins
// See https://matrix.squiz.net/manuals/edit-plus/chapters/javascript-plugins for details

/**
  * Custom WYSIWYG Styles: override how Viper loads styles so we can easily
  * implement our own.
  *
  * Normally this setting comes from the Design asset's configuration but we
  * don't have an easy way of uploading styles (yet).  We craft a JSON
  * object and populate Viper's settings here.
  *
  * Viper treats `text-selection` as the tag of "selected" text, which doesn't
  * yet have a specific HTML tag present in the editor. This special string can
  * be used for either showFor or hideFor and will be treated just like any
  * other HTML tag. To figure out if this changes, grep for `this._custStyles`
  * in the Viper source code.
  */
EasyEditAssetManager.designStyleClasses = function(asset, callback) {
  var textOnlyExcludes = 'img,table,tbody,tr,td'
  var textOnlyIncludes = 'text-selection,span,a,p'
  var buttonOnlyIncludes = 'text-selection,span,a,p,div'
  var data = {
    divClasses: [
      //{text: "JCU Content", value: "container jcu-content"}
    ],
    wysiwygClasses: {
      'Hidden on print': {classNames: 'hidden-print'},
      'Add Padding Spacing': {classNames: 'p-a-1'},
      'Add Margin Spacing': {classNames: 'm-a-1'},
      'Float (left)': {classNames: 'pull-sm-left'},
      'Float (right)': {classNames: 'pull-sm-right'},
      'Display 1 (XXXL)': {classNames: 'display-1', hideFor: textOnlyExcludes},
      'Display 2 (XXL)': {classNames: 'display-2', hideFor: textOnlyExcludes},
      'Display 3 (XL)': {classNames: 'display-3', hideFor: textOnlyExcludes},
      'Display 4 (L)': {classNames: 'display-4', hideFor: textOnlyExcludes},
      'H1 style': {classNames: 'h1', hideFor: textOnlyExcludes},
      'H2 style': {classNames: 'h2', hideFor: textOnlyExcludes},
      'H3 style': {classNames: 'h3', hideFor: textOnlyExcludes},
      'H4 style': {classNames: 'h4', hideFor: textOnlyExcludes},
      'H5 style': {classNames: 'h5', hideFor: textOnlyExcludes},
      'H6 style': {classNames: 'h6', hideFor: textOnlyExcludes},
      'Lead text': {classNames: 'lead', hideFor: textOnlyExcludes},
      'Small text': {classNames: 'small', hideFor: textOnlyExcludes},
      'Blockquote': {classNames: 'blockquote', showFor: 'blockquote'},
      'List (unstyled)': {classNames: 'list-unstyled', showFor: 'ul,ol'},
      'List (inside bordered)': {classNames: 'list-bordered', showFor: 'ul,ol'},
      'Image (responsive)': {classNames: 'img-fluid', showFor: 'img'},
      'Image (circle)': {classNames: 'img-circle', showFor: 'img'},
      'Image (thumbnail)': {classNames: 'img-thumbnail', showFor: 'img'},
      'Table': {classNames: 'table', showFor: 'table'},
      'Table (inverse)': {classNames: 'table-inverse', showFor: 'table'},
      'Table Head (inverse)': {classNames: 'thead-inverse', showFor: 'thead'},
      'Table (Striped)': {classNames: 'table-striped', showFor: 'table'},
      'Table (Bordered)': {classNames: 'table-bordered', showFor: 'table'},
      'Table (Hover)': {classNames: 'table-hover', showFor: 'table'},
      'Table (Small)': {classNames: 'table-sm', showFor: 'table'},
      'Table Wrapper (Responsive)': {classNames: 'table-responsive', showFor: 'div'},
      'Button': {classNames: 'btn', showFor: buttonOnlyIncludes},
      'Button (small)': {classNames: 'btn-sm', showFor: buttonOnlyIncludes},
      'Button (large)': {classNames: 'btn-lg', showFor: buttonOnlyIncludes},
      'Button (link)': {classNames: 'btn-link', showFor: 'button'},
      'Button (block)': {classNames: 'btn-block', showFor: buttonOnlyIncludes},
    }
  }

  // Buttons
  var buttonColors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger']
  buttonColors.forEach(function(color) {
    data.wysiwygClasses['Button (' + color +  ')'] = {classNames: 'btn-' + color, showFor: buttonOnlyIncludes}
    data.wysiwygClasses['Button (' + color +  ' outline)'] = {classNames: 'btn-outline-' + color, showFor: buttonOnlyIncludes}
  })

  // Labels
  var labelColors = ['default', 'primary', 'success', 'info', 'warning', 'danger']
  data.wysiwygClasses['Label'] = {classNames: 'label', showFor: textOnlyIncludes}
  labelColors.forEach(function(color) {
    data.wysiwygClasses['Label (' + color +  ')'] = {classNames: 'label-' + color, showFor: textOnlyIncludes}
  })

  // Alerts
  var alertColors = ['success', 'info', 'warning', 'danger']
  data.wysiwygClasses['Alert Link'] = {classNames: 'alert-link', showFor: 'a'}
  alertColors.forEach(function(color) {
    data.wysiwygClasses['Alert (' + color +  ')'] = {classNames: 'alert alert-' + color, showFor: 'p,div'}
  })

  // Utilities
  var contextualColors = ['muted', 'primary', 'success', 'info', 'warning', 'danger']
  contextualColors.forEach(function(color) {
    data.wysiwygClasses['Text (' + color +  ')'] = {classNames: 'text-' + color, showFor: textOnlyIncludes}
  })
  // also text-white for use on solid bg
  data.wysiwygClasses['Text (white)'] = {classNames: 'text-white', showFor: textOnlyIncludes}
  var bgColors = ['primary', 'success', 'info', 'warning', 'danger', 'inverse']
  bgColors.forEach(function(color) {
    data.wysiwygClasses['Background (' + color +  ')'] = {classNames: 'bg-' + color, showFor: "p,div"}
  })

  // Call the blackbox-callback so editor classes are populated
  callback.call(this, data)
}

/**
  * JCU Web Framework JS: generate wrapper init that can use custom jQuery
  */
function initWebFrameworkComponents($) {
  return function() {
    // After initial load of custom jQuery/Bootstrap load, restore the `jQuery` name
    if (window.jQuery === window.jQuery214) {
      window.jQuery.noConflict(true)
    }

    // Collapsing metadata sections
    $('.content_template_custom_layout .metadata [class^=schemaHeading_], #ees_editMetadata [class^=schemaHeading_]').each(function(schema_index) {

      // Prepare the metadata section divs
      $(this).nextUntil('[class^=schemaHeading]').filter('.editSection').addClass('collapse').each(function(section_index) {
        // Add identifier to the section for targetting
        var section_id = 'metadata_schema_' + schema_index + '_section_' + section_index
        $(this).attr('id', section_id)
        // Prepare and initialise the section heading
        $(this).prev().wrap('<a class="collapse-toggle collapsed" data-toggle="collapse" href="#' + section_id + '"></a>').parent().collapse()
      })

      // Add expand and collapse all buttons
      $(this).append('<span class="pull-xs-right"><a class="collapse-toggle-expand" href="#">+ Expand all</a> <a class="collapse-toggle-collapse m-l-1" href="#">– Collapse all</a></span>')
    })

    // Expand all metadata section headings
    $('.collapse-toggle-expand').click(function() {
      $(this).parent().parent().nextUntil('[class^=schemaHeading]').filter('.editSection').collapse('show')
      return false
    })

    // Collapse all metadata section headings
    $('.collapse-toggle-collapse').click(function() {
      $(this).parent().parent().nextUntil('[class^=schemaHeading]').filter('.editSection').collapse('hide')
      return false
    })

    // Preview window lazy loading
    $('.collapse-toggle-preview').click(function() {
      var targetFrame = $($(this).attr('href')).find('iframe').first()
      // Test if target frame exists and isn't already configured
      if (targetFrame && !targetFrame.attr('src')) {
        targetFrame.attr('src', targetFrame.attr('data-src'))
      }
    })
  }
}

/**
  * JCU Web Framwork plugin - Integrates various Bootstrap and other custom
  * components with Edit+
  */
EasyEdit.plugins.jcuWebFrameworkJS = {
  init: function () {

    EasyEditEventManager.bind("EasyEditAfterLoad", function () {
      // Test for custom jQuery version and `collapse` function from Bootstrap's JS
      // If these exist don't load the libraries again
      if (!(window.jQuery214 && window.jQuery214.fn.collapse)) {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/tether/1.1.1/js/tether.min.js', function() {
          // JCU Bootstrap requires jQuery < v3, but we use whatever jQuery
          // is available as `$` to get the specific version of jQuery
          $.getScript('https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js', function() {
            // Relinquish control of `$` ASAP
            window.jQuery214 = window.jQuery.noConflict()
            window.jQuery214.getScript('https://cdn.jcu.edu.au/web-framework/1.0.0-beta.1/js/jcu.min.js', initWebFrameworkComponents(window.jQuery214))

            // Handle changes in screen (eg Content to Metadata)
            EasyEditEventManager.bind("EasyEditScreenLoad", initWebFrameworkComponents(window.jQuery214))
          })
        })
      }
    })

    EasyEditEventManager.bind("EasyEditScreenLoad", function () {
      // Monkey patch the Viper WYSIWYG table editor so that it doesn't add
      // borders and conflicting attributes
      if (typeof Viper !== "undefined" &&
          typeof Viper.Selection !== "undefined" &&
          typeof Viper.Selection._viper !== "undefined" &&
          Viper.Selection._viper !== null &&
          typeof Viper.Selection._viper.PluginManager !== "undefined" &&
          typeof Viper.Selection._viper.PluginManager._plugins !== "undefined" &&
          typeof Viper.Selection._viper.PluginManager._plugins.ViperTableEditorPlugin !== "undefined" &&
          typeof Viper.Selection._viper.PluginManager._plugins.ViperTableEditorPlugin.insertTable === "function" &&
          !Viper.Selection._viper.PluginManager._plugins.ViperTableEditorPlugin.insertTable.patched) {
        var oldFn = Viper.Selection._viper.PluginManager._plugins.ViperTableEditorPlugin.insertTable
        Viper.Selection._viper.PluginManager._plugins.ViperTableEditorPlugin.insertTable = function() {
          var table = oldFn.apply(this, arguments)
          // By this point, the table has already been inserted into the DOM via
          // this.viper.getViperElement().appendChild(f) in `insertTable`
          // so we can manipulate it freely -- and wrap it.
          table.removeAttribute('style')
          table.removeAttribute('id')
          table.removeAttribute('border')
          table.setAttribute('class', 'table')
          $(table).wrap('<div class="table-responsive"></div>')
          return table
        }
        Viper.Selection._viper.PluginManager._plugins.ViperTableEditorPlugin.insertTable.patched = true
      }
    })
  }
}


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
  * Open Asset Finder plugin - Automatically opens the Asset Finder via the URL
  */
EasyEdit.plugins.openAssetFinderViaUrl = {
  init: function() {
    EasyEditEventManager.bind('EasyEditAfterLoad', function() {
      if (window.location.hash.startsWith('#openFinder')) {
        EasyEditComponents.openAssetFinder()
      }
    })
  }
}

/**
  * Delete Asset plugin - Automatically mark all links for deletion
  */
EasyEdit.plugins.deleteAssetViaUrl = {
  init: function() {
    EasyEditEventManager.bind('EasyEditAfterLoad', function() {
      if (window.location.hash.startsWith('#deleteAsset')) {
        EasyEditScreens.getCurrentScreen().markAll()
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
        buttons += '<a href="' + EasyEdit.getURL().url + '/_noproxycache" class="btn btn-secondary" title="Go to public view" target="_blank" rel="noopener noreferrer"><span class="icon-eye" aria-label="View icon"></span></a><a class="btn btn-secondary" href="https://www.jcu.edu.au/digital-marketing/" target="_blank" title="Get help from a human" rel="noopener noreferrer"><span class="icon-support" aria-label="Help icon"></span></a>'
        buttons += '</div>'
        return $(oldFn()).append(buttons)[0].outerHTML
      }
    })
  }
}

/**
* Hotfix Plugin - Fixes various EasyEdit bugs and incomatibilities
*/
EasyEdit.plugins.fixMetadataSectionHeadings = {
  init: function() {
    // Bug fix: Section headings combine heading + description in an incomprehensible mess
    // in 5.5.3.0 (and above?). See https://github.com/jcu-eresearch/matrix-helpers/issues/147
    EasyEditEventManager.bind("EasyEditScreenLoad", function () {
      $('[class^=sectionHeading]').each(function(i, element) {
        element.innerHTML = element.innerHTML.replace(
          /(.*) \|\| (.*)/gm,
          '<span class="section-heading">$1</span> <span class="section-description">$2</span>'
        )
      })
    })
  }
}
EasyEdit.plugins.fixImageEditorAspectRatio = {
  init: function() {
    EasyEditEventManager.bind("EasyEditBeforeLoad", function () {
      var oldFn = EasyEditImageEditor.prototype._getTemplate

      EasyEditImageEditor.prototype._getTemplate = function() {
          var returnValue = oldFn.apply(this, arguments)
          // This data attribute, unused by the image editor, conflicts
          // with our Bootstrap JavaScript loaded above
          return returnValue.replace('data-toggle="buttons"', '')
      }
    })
  }
}
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
                button.closest('.bodycopy_manager_div').before('<div class="container m-y-1 template-alert"><div class="alert alert-warning" role="alert"><strong>Warning!</strong> Changing content block templates may result in your current settings being inaccessible or unused in that new template. Take a copy of any settings in a text editor (such as Notepad) if you need them later.</div></div>')
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
    a link matching the structure of <a href="#tool-colorpicker"></a>
  */
EasyEdit.plugins.colorPickerFields = {
  init: function () {

    EasyEditEventManager.bind("EasyEditScreenLoad", function () {
      if ($('.sq-metadata-description > a[href="#tool-colorpicker"]')) {
        var initialiseColorPickers = function() {
            $('.sq-metadata-description > a[href="#tool-colorpicker"]').closest('.row').find('input[id*=metadata_field][type=text]').colorPicker({
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
        }

        // If library is already loaded
        if ($.fn.colorPicker) {
          initialiseColorPickers()
        } else {
          $.getScript('https://cdnjs.cloudflare.com/ajax/libs/tinyColorPicker/1.1.1/jqColorPicker.min.js', initialiseColorPickers)
        }
      }
    })
  }
}

/**
  * Icon picker fields: add a helpful icon autocompleter  if the field description contains
  * a link matching the structure of <a href="#tool-iconpicker"></a>
  *
  * Known issue: performance due to showing all rows
  *   See https://github.com/select2/select2/issues/813
  */

var iconJsonAssetId = '413526' // Asset ID of a the JSON file that holds the icon data
var iconData = []

EasyEdit.plugins.iconPickerFields = {
  init: function () {

    EasyEditEventManager.bind("EasyEditScreenLoad", function () {
      if ($('.sq-metadata-description > a[href="#tool-iconpicker"]')) {
        var formatItem = function(data) {
          if (!data.id) { return data.text; }
          return $('<span><span class="' + data.id + '" aria-label=""></span> ' + data.text + '</span>')
        }

        var initialiseIconPickers = function(icon_data) {
            $('.sq-metadata-description > a[href="#tool-iconpicker"]')
              .closest('.row')
              .find('input[id*=metadata_field][type=text]')
              .replaceWith(function() {
                return $('<select></select>', {
                  class: "form-control form-control-lg icon-picker",
                  style: "width: 100%;",
                  name: this.name,
                  disabled: this.disabled
                }).append('<option value="' + this.value + '" selected>' + this.value + '</option></select>')
              })
            $('select.icon-picker').select2({
              data: icon_data,
              templateResult: formatItem,
              templateSelection: formatItem
            })
        }

        // If library is already loaded
        if ($.fn.select2 && iconData) {
          initialiseIconPickers(iconData)
        } else {
          $("head link[rel='stylesheet']").last().after('<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />');
          $.getScript('https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js', function () {
            $.getJSON("/?a=" + iconJsonAssetId, function(data) {
              iconData = data
              initialiseIconPickers(iconData)
            })
          })
        }
      }
    })
  }
}
