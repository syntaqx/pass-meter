'use strict';

// Module dependencies
var assert    = require('assert')
var PassMeter = require('../src/pass-meter.js')

// Simple Tests

describe('PassMeter', function () {

  var meter = new PassMeter()

  it('#test() should return a number between 0 and 100', function () {
    assert.ok(typeof meter.test('random') === 'number')
  })

  it('#test() should return a score between 0 and 100', function () {
    var strings = [
      'something',
      'somethingElse',
      'anotherRandom',
      'andThisGoodies'
    ], result

    strings.forEach(function (value) {
      result = meter.test(value)
      assert.ok(result >= 0 && result <= 100)
    })
  })

})