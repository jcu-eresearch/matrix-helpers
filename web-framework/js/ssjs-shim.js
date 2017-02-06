// If in a browser (via ?SQ_DISABLE_SERVER_JS), re-work the print() function
if (typeof window !== "undefined") {
  window.print = function() {
    _.each(arguments, function(val) { document.write('' + val)  } )
  }
  window.var_dump = function() {
    _.each(arguments, function(val) { document.write(JSON.stringify(val)) } )
  }
}
var data = {}
