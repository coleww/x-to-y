x-to-y
----------------

a tool for rapidly scaffolding x-to-y style twitter bots. inspired by [boy2bot](https://twitter.com/boy2bot) by [rainshapes](https://twitter.com/rainshapes)

[![NPM](https://nodei.co/npm/x-to-y.png)](https://nodei.co/npm/x-to-y/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://secure.travis-ci.org/coleww/x-to-y.png)](http://travis-ci.org/coleww/x-to-y)

### EXAMPLE

```
var xToY = require('x-to-y')
xToY('bot', 'boy', {
      consumer_key: 'SPIDERS!!!!',
      consumer_secret: 'SPIDERS!!!!',
      access_token: 'SPIDERS!!!!',
      access_token_secret: 'SPIDERS!!!!'
    })
```

call that on a cronjob and yr done!

The sauce code is annotated if u want to, oh, i'll just paste the relevant portion here:

```
  T.get('search/tweets', { q: x, count: 100, result_type: 'recent' }, function(err, data, response) { // grab 100 of the most recent tweets with this X
    var cleaned = data.statuses.map(cleanThisTweetUp).filter(function(t){ // remove usernames, links, hastags, etc.
      return t && !!t.match(x) && iscool(t) // filter out ones that don't actually contain x, or that are not cool
    })
    var toot = pick(cleaned)[0] // pick one at random
    toot = addEnder(cap(toot.replace(new RegExp(x, 'gi'), y))) // replace x with y, capitalize the tweet, and add a period if one is not present
    console.log(toot)
    if (toot.length < 140) { // if y is longer than x, then it is possible to make a too long tweet! that is not good!
      T.post('statuses/update', {status: toot}, function (err, data, response) { // tweet it out to the world!
```
