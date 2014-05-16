/*!
 * pass-meter v1.0.0
 * https://github.com/syntaqx/pass-meter
 *
 * Copyright (c) 2014 Chase Hutchins <syntaqx@gmail.com>
 * Released under the MIT license
 */
(function (root, factory) {

  // AMD. Register as a named module.
  if (typeof define === 'function' && define.amd) {
    define('pass-meter', factory)

  // Node. Does not work with strict CommonJS, but only CommonJS-like
  // environments that supports module.exports like Node.
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()

  // Browser globals (root is window)
  } else {
    root.PassMeter = factory()
  }

}((typeof window !== 'undefined' ? window : this), function () {

  'use strict';

  var defaultOptions = {
    events:    'keyup',
    afterTest: null,
    // http://xato.net/passwords/more-top-worst-passwords
    commonPasswords: [
      'password',
      '123456',
      '12345678',
      '1234',
      'qwerty'
    ]
  }

  var extend

  if (typeof jQuery !== 'function') {
    // A simpler version of jQuery's extend function to combine objets.
    extend = function() {
      var target = arguments[0] || {},
          i      = 1,
          length = arguments.length,
          options,
          name,
          copy,
          src,
          clone

      for (; i < length; i++) {
        if ((options = arguments[i]) !== null) {
          for (name in options) {
            src  = target[name];
            copy = options[name]

            if (target === copy) {
              continue
            }

            if (copy !== undefined) {
              target[name] = copy
            }
          }
        }
      }

      return target;
    }
  } else {
    extend = jQuery.extend
  }

  var PassMeter = function (options) {
    if (typeof options === 'undefined') {
      options = {}
    } else if (typeof options === 'function') {
      options = {
        afterTest: options
      }
    }

    this.options = extend({}, defaultOptions, options)
  }

  PassMeter.prototype = {

    constructor: PassMeter,

    // Password checks
    checks: [
      {
        score: 35,
        callback: function (value) {
          return value.length >= 8
        }
      },
      { score: 20, regex: new RegExp('[A-Z]') }, // uppercase
      { score: 10, regex: new RegExp('[a-z]') }, // lowercase
      { score: 10, regex: new RegExp('[0-9]') }, // numbers
      { score: 25, regex: new RegExp('\\W') },   // symbols
      {
        score: -100,
        callback: function (value) {
          if (this.options.commonPasswords.indexOf(String(value).toLowerCase()) !== -1) {
            return true
          }

          return false
        }
      },
    ],

    // Test the strength of a given value
    // @TODO: This needs to be a decent algorithm. It's current pretty
    // simplistic and could benefit greatly.
    test: function (value) {
      var self  = this,
          total = 0

      // Iterate each check and return the sum of all scores
      this.checks.forEach(function (check) {
        if (check.hasOwnProperty('regex')) {
          if (value.match(check.regex)) {
            total += check.score
          }
        } else if (check.hasOwnProperty('callback')) {
          if (check.callback.call(self, value)) {
            total += check.score
          }
        }
      })

      // Make sure we're still dealing with 0-100% (just incase)
      if (total < 0)   total = 0
      if (total > 100) total = 100

      // Run an afterTest callback if defined
      if (typeof this.options.afterTest === 'function') {
        this.options.afterTest(total, value)
      }

      return total
    }

  }

  // A really lightweight jQuery plugin wrapper around the constructor,
  // preventing against multiple instantiations.
  if (typeof jQuery === 'function' && jQuery.fn) {
    jQuery.fn.passMeter = function (options) {
      return this.each(function () {
        var $el = jQuery(this)

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
  }

  // Export to UMD
  return PassMeter

}))