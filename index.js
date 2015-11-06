var Twit = require('twit')
var pick = require('pick-random')
var cap = require('capitalize')
var addEnder = require('add-ender')
var tipots = require('this-is-probably-ok-to-say')
var cleanThisTweetUp = require('clean-this-tweet-up')

module.exports = function(x, y, lang, config) {
  var reggie = '\b' + x + '\b'
  var T = new Twit(config)
  T.get('search/tweets', { q: x, count: 100, result_type: 'recent', lang: lang}, function(err, data, response) { // grab 100 of the most recent tweets with this X
    var cleaned = data.statuses.map(cleanThisTweetUp).filter(function(t){ // remove usernames, links, hastags, etc.
      return t && !!t.match(reggie) && tipots(t) // filter out ones that don't actually contain x, or that are not cool
    }).map(function(x){
      return x.match(/[a-zA-Z0-9\s]+/g)[0] // umm hopefully this destroys the weird image bug
    }).filter(function(t){
      return !!t.match(reggie)
    })
    if (cleaned){
      var toot = pick(cleaned)[0] // pick one at random
      toot = addEnder(cap(toot.replace(new RegExp(reggie, 'gi'), y))) // replace x with y, capitalize the tweet, and add a period if one is not present
      console.log(toot)
      if (toot.length < 140) { // if y is longer than x, then it is possible to make a too long tweet! that is not good!
        T.post('statuses/update', {status: toot}, function (err, data, response) { // tweet it out to the world!
          console.log(err)
          console.log(data)
        })
      }
    }
  })
}
