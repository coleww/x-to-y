var tap = require('tap')

var socialistToSocialMedia = require('./')

tap.test('does the thing', function (t) {
  t.plan(1)
  t.equal(socialistToSocialMedia('world'), 'hello world', 'does it')
})
