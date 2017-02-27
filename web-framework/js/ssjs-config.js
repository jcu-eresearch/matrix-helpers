/* jslint browser: true, asi: true */
/* globals _, print */

// If in a browser (via ?SQ_DISABLE_SERVER_JS), re-work the print() function
if (typeof window !== "undefined") {
  window.print = function() {
    _.each(arguments, function(val) { document.write('' + val)  } )
  }
  window.var_dump = function() {
    _.each(arguments, function(val) { document.write(JSON.stringify(val)) } )
  }
}
var data = {
  includes: {
    css: [],
    js: []
  }
}

function phrasingHtmlFromKeyword(keyword, options) {
  options = options || {}
  var strip_modifier = 'striphtml:<abbr><audio><b><bdo><br><button><canvas><cite><code><command><datalist><dfn><em><embed><i><iframe><img><input><kbd><keygen><label><mark><math><meter><noscript><object><output><progress><q><ruby><samp><script><select><small><span><strong><sub><sup><svg><textarea><time><var><video><wbr><a><area><del><ins><link><map><meta>'

  if (keyword) {
    print('%' + keyword + '^' + strip_modifier +
      (options.prepend ? '^prepend_if:' + options.prepend : '') +
      (options.append ? '^append_if:' + options.append : '') + '%')
  } else {
    print('<div class="alert alert-danger" role="alert"><strong>Error!</strong> Phrasing HTML paint layout called without a keyword specified.</div>')
  }
}

// Add jcu function execution here...
