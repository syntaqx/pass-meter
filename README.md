# [Pass-Meter.js](https://github.com/syntaqx/pass-meter) v1.0.0

[![Build Status](https://travis-ci.org/syntaqx/pass-meter.png?branch=master)](https://travis-ci.org/syntaqx/pass-meter "Travis Build Status")

Simple password strength testing.

## Optional Dependencies

* jQuery 1.7 or higher *(needed for plugin usage)*

## Usage

When used as either a jQuery plugin or Module, Pass-Meter only expects a single
argument. If the argument is a function, it is treated as the `afterTest`
callback option. If you need to specify additional options, you will need to
provide a standard options object.

### ..:: jQuery

Simple call the `$.passMeter` plugin on any elements you'd like. Create your own
styling in the callback:

```js
$('input[type="password"]').passMeter(function (score) {
  alert('Your password is ' + score + '% strong.')
})
```

Or, with additional options:

```js
$('input[type="password"]').passMeter({
  event: 'change',
  afterTest: function (score) {
    alert('Your password is ' + score + '% strong.')
  }
})
```

### ..:: Module

```js
var PassMeter = require('pass-meter')

var meter = new PassMeter()
var pass  = 'apasswordtotest'

console.log('The password "' + pass + '" is ' + meter.test(pass) + '% strong')
```

Or, with additional options:

```js
var PassMeter = require('pass-meter')

var meter = new PassMeter({
  afterTest: function (score, value) {
    console.log('The password ' + value + ' is ' + score + '% strong')
  }
})

meter.test('apasswordtotest')
```

## Options

<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>events</code></td>
      <td>keyup</td>
      <td>Events to bind when using the module as a jQuery plugin</td>
    </tr>
    <tr>
      <td><code>afterTest</code></td>
      <td>null</td>
      <td>A callback for when a test has been completed.</td>
    </tr>
    <tr>
      <td><code>commonPasswords</code></td>
      <td><code>['password', '123456', '12345678', '1234', 'qwerty']</code></td>
      <td>An array of common passwords to instantly fail.</td>
    </tr>
  </tbody>
</table>

## License

Pass-Meter is open source software licensed under the
[MIT license](https://raw.githubusercontent.com/syntaqx/pass-meter/master/LICENSE).