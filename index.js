var Twit = require('twit')
var pick = require('pick-random')
var cap = require('capitalize')
var addEnder = require('add-ender')
var tipots = require('this-is-probably-ok-to-say')
var cleanThisTweetUp = require('clean-this-tweet-up')


module.exports = function(x, y, lang, config, nopes) {

  var T = new Twit(config)
  T.get('search/tweets', { q: x, count: 100, result_type: 'recent', lang: lang}, function(err, data, response) { // grab 100 of the most recent tweets with this X
    var cleaned = data.statuses.filter(function (t) {
      return !t.entities.user_mentions.length
    }).map(cleanThisTweetUp).filter(function (t) { // remove usernames, links, hastags, etc.
      return t && !!t.match(x) && tipots(t) // filter out ones that don't actually contain x, or that are not cool
    }).map(function(x){
      return x.split(' ').map(function (w) {
        return w.match(/\//) ? '' : w // REALLY destroy all the links
      }).filter(function (x) {
        return !!x
      }).join(' ')
    }).filter(function(t){
      return !!t.match(x)
    })
    if (nopes) {
      cleaned = cleaned.filter(function (t) {
        return t.split(' ').every(function (w) {
          return nopes.every(function (nope) {
            return w.replace(/\W/g, '').toLowerCase().indexOf(nope) === -1
          })
        })
      })
    }

    if (cleaned){
      var toot = pick(cleaned)[0] // pick one at random
      toot = addEnder(cap(toot.replace(new RegExp(x, 'gi'), y))) // replace x with y, capitalize the tweet, and add a period if one is not present
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
