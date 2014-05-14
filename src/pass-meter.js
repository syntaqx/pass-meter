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
    events:    'keyup',
    afterTest: null // callback function (if you want)
  }

  var PassMeter = function (options) {
    // allows the afterTest to be specified as the options object
    if (typeof options === 'function') {
      options = {
        afterTest: options
      }
    }

    this.options = $.extend({}, defaultOptions, options)
  }

  PassMeter.prototype = {

    constructor: PassMeter,

    // Regular expression tests
    tests: {
      uppercase: new RegExp('[A-Z]'),
      lowercase: new RegExp('[a-z]'),
      numbers:   new RegExp('[0-9]'),
      symbols:   new RegExp('([!,%,&,@,#,$,^,*,?,_,~])')
    },

    getPercentage: function (a, b) {
      return ((b / a) * 100)
    },

    // Test the strength of a given value
    // @TODO: This needs to be a decent algorithm. It's current pretty
    // simplistic and could benefit greatly.
    test: function (value) {
      var uppercase  = 0,
          lowercase  = 0,
          numbers    = 0,
          symbols    = 0,
          total      = 0,
          score      = 0

      // They can't have a good password less than 8 characters.
      if (value.length >= 8) {
        if (value.match(this.tests.uppercase)) uppercase  = 1
        if (value.match(this.tests.lowercase)) lowercase  = 1
        if (value.match(this.tests.numbers))   numbers    = 1
        if (value.match(this.tests.symbols))   symbols    = 1

        total = uppercase + lowercase + numbers + symbols
        score = (total / 4) * 100
      } else {
        score = 5
      }

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

        // Bind to the events specified in the options
        $el.on(obj.options.events, function () {
          obj.test(this.value)
        })

        $el.data('pass-meter', obj)
      }
    })
  }

  // Export to UMD
  return PassMeter

}))