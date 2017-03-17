/* jslint browser: true, asi: true */
/* globals _, print, root, GLOBAL, self */

// If in a browser (via ?SQ_DISABLE_SERVER_JS), re-work the print() function
/*jshint ignore:start*/
if (typeof window !== "undefined") {
  window.print = function() {
    _.forEach(arguments, function(val) { document.write('' + val) } )
  }
  window.var_dump = function() {
    _.forEach(arguments, function(val) { document.write(JSON.stringify(val)) } )
  }
}
/*jshint ignore:end*/

// Store a reference to the global object ("this" in V8js, or
// "window" in a browser)
var global = this || window || root || global || GLOBAL || self

/* Public API for JCU SSJS functions */
var JCU = {
  // Data and information used in rendering
  data: {
    // Relative path to current Site asset (eg empty if at index page)
    // Workaround for https://github.com/jcu-eresearch/matrix-helpers/issues/9
    is_homepage: !'%frontend_asset_url_site_path%',
    frontend_id: '%frontend_asset_assetid%',
    frontend_theme: '%frontend_asset_metadata_jcu.features.theme%',
    homepage_theme: '%globals_site_index_id^as_asset:asset_metadata_jcu.features.theme%',
    site_theme: '%globals_site_metadata_jcu.features.theme%'
  },

  // Debugging on or off
  debug: false,

  // Libraries to be included later
  _includes: {
    css: [],
    js: []
  },

  js: {
    require: function(name) {
      JCU._includes.js[name] = true
    },
    specified: function(name) {
      return !!JCU._includes.js[name]
    }
  },

  css: {
    require: function(name) {
      JCU._includes.css[name] = true
    },
    specified: function(name) {
      return !!JCU._includes.css[name]
    }
  },

  /**
   * Create a Matrix keyword and modifiers to strip all but phrasing HTML from the input.
   * @param {string} keyword - The base Matrix keyword that generates input.
   * @param {Object} options - Options to configure the output keyword
   * @returns {string} Matrix keyword and modifiers
   */
  phrasingHtmlFromKeyword: function(keyword, options) {
    options = options || {}
    var strip_modifier = 'striphtml:<abbr><audio><b><bdo><br><button><canvas><cite><code><command><datalist><dfn><em><embed><i><iframe><img><input><kbd><keygen><label><mark><math><meter><noscript><object><output><progress><q><ruby><samp><script><select><small><span><strong><sub><sup><svg><textarea><time><var><video><wbr><a><area><del><ins><link><map><meta>'

    if (keyword) {
      return '%' + keyword + '^' + strip_modifier +
        (options.prepend ? '^prepend_if:' + options.prepend : '') +
        (options.append ? '^append_if:' + options.append : '') + '%'
    } else {
      print('<div class="alert alert-danger" role="alert"><strong>Error!</strong> Phrasing HTML paint layout called without a keyword specified.</div>')
    }
  },

  /**
   * Prints the a Matrix keyword to strip all but phrasing HTML from the input.
   * @param {string} keyword - The base Matrix keyword that generates input.
   * @param {Object} options - Options to configure the output keyword
   */
  printPhrasingHtmlFromKeyword: function(keyword, options) {
    print(JCU.phrasingHtmlFromKeyword(keyword, options))
  },

  /**
   * Determine if a Content Container's HTML has a wrapper applied.
   * @param {string} content - Content Container's rendering from asset_contents keyword
   * @returns {Boolean}
   */
  isContentWrapped: function(content) {
    // Only presentaation tag-wrapped Content Containers start and end with a new line
    return _.startsWith(content, '\r\n') && _.endsWith(content, '\r\n')
  },

  /**
   * Break a Content Container's HTML into parts for use in CCT Paint Layouts.
   * This solves the problems with not being able to access the Content
   * Container properties presented in:
   * https://github.com/jcu-eresearch/matrix-helpers/issues/41
   * https://github.com/jcu-eresearch/matrix-helpers/issues/59
   * @param {string} content - Content Container's rendering from asset_contents keyword
   * @returns {Object} The container's parts
   */
  extractContentContainerParts: function(content) {
    var result
    if (JCU.isContentWrapped(content)) {
      var lines = content.split('\r\n')
      result = {opening: lines[1].replace('>', ''), innerHTML: _.slice(lines, 2, -2).join('\r\n'), closing: _.nth(lines, -2)}
    } else {
      result = {opening: '<div', innerHTML: content, closing: '</div>'}
    }
    // Workaround for https://github.com/jcu-eresearch/matrix-helpers/issues/12
    if (result.innerHTML === "<p></p>") {
      result.innerHTML = ''
    }

    return result
  },

  /**
   * Run globally-defined functions with a given string `prefix`
   * When run at different points in SSJS execution, this allows the execution
   * of a function that is otherwise definied later (due to hoisting).
   * @param {string} prefix - Function prefix to inspect for
   */
  runGlobalFunctions: function (prefix) {
    if (JCU.debug) {
      print('<!-- Running global SSJS functions prefixed as `' + prefix + '` -->\n')
    }
    Object.getOwnPropertyNames(global).forEach(function (value) {
      if (value.search(prefix) === 0) {
        if (JCU.debug) {
          print('<!-- Running ' + value + '() now -->\n')
        }
        global[value]()
      }
    })
  },

  /**
   * Resolve inheritance of homepage, frontend and site settings
   *
   * This resolution method also works around https://github.com/jcu-eresearch/matrix-helpers/issues/9
   * where keywords aren't consistent in the case of the homepage.
   *
   * @param {Object} inputs - triple consisting of homepage, frontend and site settings to test
   * @returns {Object} The resolved value (winner of the 3 inputs)
   */
  resolveInheritance: function (inputs) {
    var result
    if (JCU.data.is_homepage) {
      if (inputs.homepage_data === 'inherit') {
        result = inputs.site_data
      } else {
        result = inputs.homepage_data
      }
    } else {
      if (inputs.frontend_data === 'inherit') {
        result = inputs.site_data
      } else {
        result = inputs.frontend_data
      }
    }

    // If we're still 'inherit', get the default
    result = result === 'inherit' ? inputs.default : result

    if (JCU.debug) {
      print('<!-- Resolved inheritance with value: ' + result + '-->')
    }

    return result
  },

  /**
   * Resolve inheritance of true/false/inherit options, which are Strings
   * (thanks Squiz Matrix for stringifying everything).
   *
   * We just return false if the Site said inherit, and still no inputs.default
   * was provided.
   *
   * @param {Object} inputs - triple consisting of homepage, frontend and site settings to test
   * @returns {Boolean} The resolved value - either true or false
   */
  resolveBooleanInheritance: function (inputs) {
    var result = JCU.resolveInheritance(inputs)

    // Parse the result: 'true' -> true, 'inherit' -> false, 'false' -> false
    if (result === 'true' || result === true) {
      result = true
    } else {
      result = false
    }

    if (JCU.debug) {
      print('<!-- Resolved Boolean inheritance with value: ' + result + '-->')
    }
    return result
  }
}

JCU.data.current_theme = JCU.resolveInheritance({
  homepage_data: JCU.data.homepage_theme,
  frontend_data: JCU.data.frontend_theme,
  site_data: JCU.data.site_theme,
  default: 'content'
})

// Run global functions after SSJS initialises
JCU.runGlobalFunctions('JCU_ssjs_')

if (JCU.debug) {
  print('<!-- Server-side JavaScript (SSJS) successfully initialised -->')
  print("<!-- JCU.data is currently " + JSON.stringify(JCU.data) + " -->")
}
