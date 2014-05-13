/*!
 * Pass-Meter.js v0.0.1-pre
 * https://github.com/syntaqx/pass-meter
 *
 * Copyright (c) 2014 Chase Hutchins <syntaqx@gmail.com>
 * Released under the MIT license
 * https://raw.githubusercontent.com/syntaqx/pass-meter/master/LICENSE
 */
(function (root, factory) {

  // AMD. Register as a named module.
  if (typeof define === 'function' && define.amd) {
    define('pass-meter', ['jquery'], factory)

  // Node. Does not work with strict CommonJS, but only CommonJS-like
  // environments that supports module.exports like Node.
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'))

  // Browser globals (root is window)
  } else {
    root.PassMeter = factory(jQuery)
  }

}((typeof window !== 'undefined' ? window : this), function ($) {

  var defaultOptions = {
    afterTest: null // callback function (if you want)
  }

  var PassMeter = function (options) {
    this.options = $.extend({}, defaultOptions, options)
    this.initialize()
  }

  PassMeter.prototype = {

    constructor: PassMeter,

    initialize: function () {
    },

    test: function (value) {
      var score

      // @TODO: Actually determine score from password complexity
      score = (Math.floor(Math.random() * 100) + 1)

      // Run an afterTest callback if defined
      if (typeof this.options.afterTest === 'function') {
        this.options.afterTest(score)
      }

      return score
    }

  }

  // A really lightweight jQuery plugin wrapper around the constructor,
  // preventing against multiple instantiations.
  $.fn.passMeter = function (options) {

    return this.each(function () {
      var $el = $(this)

      if (!$el.data('pass-meter')) {
        var obj = new PassMeter(options)

        $el.data('pass-meter', obj)
        $el.on('keyup', function () {
          obj.test(this.value)
        })
      }
    })
  }

  // Export to UMD
  return PassMeter

}))