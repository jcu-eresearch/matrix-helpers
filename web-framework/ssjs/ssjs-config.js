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
  // Debugging on or off
  debug: false,

  // Data and information used in rendering
  data: {
    // Relative path to current Site asset (eg empty if at index page)
    // Workaround for https://github.com/jcu-eresearch/matrix-helpers/issues/9
    // Also, any lines with || workaround https://github.com/jcu-eresearch/matrix-helpers/issues/78
    // by falling back to globals keywords
    is_homepage: !('%frontend_asset_url_site_path%' || '%globals_asset_url_site_path%'),
    is_404: !!'%globals_asset_assetid^eq:{globals_site_not_found_id}:true:%',
    frontend_id: '%frontend_asset_assetid%' || '%globals_asset_assetid%',
    frontend_theme: '%frontend_asset_metadata_jcu.features.theme%' || '%globals_asset_metadata_jcu.features.theme%',
    homepage_id: '%globals_site_index_id%',
    homepage_theme: '%globals_site_index_id^as_asset:asset_metadata_jcu.features.theme%',
    site_id: '%globals_site_assetid%',
    site_theme: '%globals_site_metadata_jcu.features.theme%',
    site_name: '%globals_site_name^escapequotes%'
  },

  // Hard-coded asset IDs, but just in one place
  ids: {
    subnavigation_folder_listing: 372370
  },

  // Libraries to be included later
  _includes: {
    css: {},
    js: {}
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
   * Test if a given string from Viper (WYSIWYG) editor is "empty" or not
   * Workaround for https://github.com/jcu-eresearch/matrix-helpers/issues/12
   * by testing the literal "empty" value of a an empty paragraph.
   * @param {string} str - Input string
   * @returns {Boolean} True if populated, and false if empty (or <p> tag only)
   */
  isViperStringPopulated: function(str) {
    return str && str !== "<p></p>"
  },

  /**
   * Create a Matrix keyword and modifiers to strip all but phrasing HTML from the input.
   * @param {string} keyword - The base Matrix keyword that generates input.
   * @param {Object} options - Options to configure the output keyword
   * @returns {string} Matrix keyword and modifiers
   */
  phrasingHtmlFromKeyword: function(keyword, options) {
    return JCU.stripHtmlFromKeyword(keyword, 'phrasing', options)
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
   * Create a Matrix keyword and modifiers to strip all HTML except for a
   * few text format tags from the input.
   * @param {string} keyword - The base Matrix keyword that generates input.
   * @param {Object} options - Options to configure the output keyword
   * @returns {string} Matrix keyword and modifiers
   */
  stripNonTextualHtmlFromKeyword: function(keyword, options) {
    return JCU.stripHtmlFromKeyword(keyword, 'textual', options)
  },

  /**
   * Prints the a Matrix keyword to strip all HTML except a few text
   * format tags from the input.
   * @param {string} keyword - The base Matrix keyword that generates input.
   * @param {Object} options - Options to configure the output keyword
   */
  printTextualHtmlFromKeyword: function(keyword, options) {
    print(JCU.stripNonTextualHtmlFromKeyword(keyword, options))
  },

  /**
   * Implementation of HTML stripping via Matrix keyword modifier.
   * @param {string} keyword - The base Matrix keyword supplying input.
   * @param {string} whitelist - a list of HTML tags to allow in the
   *     output, in the format "<tag1><tag2><tag3>".  Special value
   *     "phrasing" will whitelist all phrasing tags, and "textual"
   *     will whitelist a subset of phrasing tags that only modify text
   *     rendering (excluding things like textarea, svg, audio, etc).
   * @param {Object} options - Options to configure output.
   * @param {string} options.prepend - string to prepend to output
   * @param {string} options.append - string to append to output
   */
  stripHtmlFromKeyword: function(keyword, whitelist, options) {
    whitelist = whitelist || 'phrasing'
    options = options || {}
    if (whitelist === 'phrasing') {
      whitelist = '<abbr><audio><b><bdo><br><button><canvas><cite><code><command><datalist><dfn><em><embed><i><iframe><img><input><kbd><keygen><label><mark><math><meter><noscript><object><output><progress><q><ruby><samp><script><select><small><span><strong><sub><sup><svg><textarea><time><var><video><wbr><a><area><del><ins><link><map><meta>'
    } else if (whitelist === 'textual') {
      whitelist = '<abbr><b><bdo><cite><code><dfn><em><i><kbd><mark><noscript><output><q><ruby><samp><script><span><strong><sub><sup><time><var><wbr><a><del><ins>'
    } else if (whitelist === 'flow') {
      whitelist = '<a><abbr><address><article><aside><audio><b>,<bdo><bdi><blockquote><br><button><canvas><cite><code>,<data><datalist><del><details><dfn><div><dl><em><embed><fieldset><figure><footer><form><h1><h2><h3><h4><h5><h6><header><hgroup><hr><i><iframe><img><input><ins><kbd><keygen><label><main><map><mark><math><menu><meter><nav><noscript><object><ol><output><p><pre><progress><q><ruby><s><samp><script><section><select><small><span><strong><sub><sup><svg><table><template><textarea><time><ul><var><video><wbr>'
    } else if (whitelist === 'address') {
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
      whitelist = '<a><abbr><audio><b>,<bdo><bdi><blockquote><br><button><canvas><cite><code>,<data><datalist><del><details><dfn><div><dl><em><embed><fieldset><figure><form><hr><i><iframe><img><input><ins><kbd><keygen><label><main><map><mark><math><menu><meter><noscript><object><ol><output><p><pre><progress><q><ruby><s><samp><script><select><small><span><strong><sub><sup><svg><table><template><textarea><time><ul><var><video><wbr>'
    }
    if (keyword) {
      return '%' + keyword + '^striphtml:' + whitelist +
        (options.prepend ? '^prepend_if:' + options.prepend : '') +
        (options.append ? '^append_if:' + options.append : '') + '%'
    } else {
      print('<div class="alert alert-danger" role="alert"><strong>Error!</strong> HTML stripping paint layout called without a keyword specified.</div>')
    }
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
   * https://github.com/jcu-eresearch/matrix-helpers/issues/59
   *
   * However, as can be seen below, this method of determining whether
   * something is wrapped or not is extremely brittle and relies on precisely
   * the right linebreaks being outputted by Matrix's core.
   *
   * Whenever https://github.com/jcu-eresearch/matrix-helpers/issues/41 is
   * resolved, this can be carried out in keywords rather than string matching.
   *
   * @param {string} content - Content Container's rendering from asset_contents keyword
   * @returns {Object} The container's parts
   */
  extractContentContainerParts: function(content) {
    var classAttrRegex = / class="(.*?)"/i
    var result
    if (JCU.isContentWrapped(content)) {
      var lines = content.split('\r\n')
      var classAttrResult = classAttrRegex.exec(lines[1])
      result = {
        opening: lines[1].replace('>', '').replace(classAttrRegex, ''),
        classAttr: classAttrResult && classAttrResult[1],
        innerHTML: _.slice(lines, 2, -2).join('\r\n'),
        closing: _.nth(lines, -2)
      }
    } else {
      result = {opening: '<div', innerHTML: content, closing: '</div>'}
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
  },

  /**
   * Resolve a correct 'current' value given whether the current page is the
   * homepage or not.
   *
   * Workaround for https://github.com/jcu-eresearch/matrix-helpers/issues/9
   * which states that % globals % aren't consistent and also that
   * % frontend % keywords don't give us the homepage (they give us the site).
   *
   * @param {Object} inputs - object consisting of homepage & frontend choices
   * @returns {Boolean} The resolved value
   */
  resolveCurrentAssetData: function (inputs) {
    var result = JCU.data.is_homepage ? inputs.homepage_data : inputs.frontend_data
    if (JCU.debug) {
      print('<!-- Resolved current asset data with value: ' + result + '-->')
    }
    return result
  },

  /**
   * Resolve an asset into components for use in an <a> tag output.
   *
   * This resolves the href to be the current assset's URL, unless the asset is a Link,
   * in which case we use the Link asset's URL attribute (the URL to which it points at).
   *
   * This allows us to do things like point at a #anchor tag inside a page.
   *
   * @param {Object} data - Input object consisting of required values
   * @returns {Object} The resolved structure with href/rel attributes
   */
  resolveLinkAssetData: function (data) {
    var result = {href: '', rel: ''}

    if (data.asset_type_code === 'link') {
      result.href = data.link_url
      result.rel = data.link_relation
    } else {
      result.href = data.asset_url
    }

    // Only wrap if a value is present
    if (result.href) {
      result.href = 'href="' + result.href + '"'
    }
    if (result.rel) {
      result.rel = 'rel="' + result.rel + '"'
    }

    if (JCU.debug) {
      print('<!-- Resolved linked asset data with value: ' + JSON.stringify(result) + '-->')
    }
    return result
  }

}

JCU.data.current_id = JCU.resolveCurrentAssetData({
  homepage_data: JCU.data.homepage_id,
  frontend_data: JCU.data.frontend_id
})
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
