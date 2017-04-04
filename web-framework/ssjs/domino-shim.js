/* jshint asi: true */
/* globals print */
this.console = {log: function() { print.apply(this, arguments) }}
this.setTimeout = function() { print('setTimeout is not implemented') }
this.setInterval = function() { print('setInterval is not implemented') }
this.clearTimeout = function() { print('clearTimeout is not implemented') }
this.clearInterval = function() { print('clearInterval is not implemented') }
