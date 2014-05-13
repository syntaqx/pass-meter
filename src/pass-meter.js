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

}(this, function ($) {

  'use strict'

  var defaultOptions = {
    events: {
      'keyup': 'checkStrength'
    }
  }

  function PassMeter (element, options) {
    this.el      = element
    this.$el     = $(element)
    this.options = $.extend({}, defaultOptions, options)

    this.initialize()
  }

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  PassMeter.prototype = {

    constructor: PassMeter,

    initialize: function () {
      this.delegateEvents()
    },

    delegateEvents: function (events) {
      if (!events) {
        events = this.options.events
      }

      for (var key in events) {
        var method = events[key]

        if (!$.isFunction(method)) method = this[events[key]]
        if (!method) continue

        var match     = key.match(delegateEventSplitter),
            eventName = match[1],
            selector  = match[2],
            self      = this

        if (selector === '') {
          this.$el.on(eventName, method)
        } else {
          this.$el.on(eventName, selector, method)
        }
      }

      return this
    },

    checkStrength: function (e) {
      var $el = $(e.target)

      // ... need to actually write the complexity checking here ...

      $el.trigger('pass-change', Math.floor((Math.random() * 100) + 1));
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