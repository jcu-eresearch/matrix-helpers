/* jslint browser: true, asi: true */
/* globals _, print */

// If in a browser (via ?SQ_DISABLE_SERVER_JS), re-work the print() function
if (typeof window !== "undefined") {
  window.print = function() {
    _.forEach(arguments, function(val) { document.write('' + val)  } )
  }
  window.var_dump = function() {
    _.forEach(arguments, function(val) { document.write(JSON.stringify(val)) } )
  }
}

/* Public API for JCU SSJS functions */
var JCU = {
  // Data and information used in rendering
  data: {},

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

  printPhrasingHtmlFromKeyword: function(keyword, options) {
    print(JCU.phrasingHtmlFromKeyword(keyword, options))
  }
}

// BBB Compatibility
var phrasingHtmlFromKeyword = JCU.phrasingHtmlFromKeyword
var printPhrasingHtmlFromKeyword = JCU.printPhrasingHtmlFromKeyword


// Add jcu function execution here...
