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
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'))

  // Browser globals (root is window)
  } else {
    root.PassMeter = factory(jQuery)
  }

}(this, function ($) {

  var defaultOptions = {
  }

  function PassMeter (element, options) {
    this.el      = element
    this.$el     = $(element)
    this.options = $.extend({}, defaultOptions, options)

    this.initialize()
  }

  PassMeter.prototype = {

    constructor: PassMeter,

    initialize: function () {
    }

  }

  // A really lightweight jQuery plugin wrapper around the constructor,
  // preventing against multiple instantiations.
  $.fn.passMeter = function (options) {
    return this.each(function () {
      if (!$.data(this, 'pass-meter')) {
        $.data(this, 'pass-meter', new PassMeter(this, options))
      }
    })
  }

  return PassMeter

}))