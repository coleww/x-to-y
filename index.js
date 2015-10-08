var Twit = require('twit')
var pick = require('pick-random')
var capitalize = require('capitalize')
var addEnder = require('add-ender')
var iscool = require('iscool')()
var cleanThisTweetUp = require('clean-this-tweet-up')

module.exports = function(x, y, config) {
  var T = new Twit(config)
  T.get('search/tweets', { q: x, count: 100, result_type: 'recent' }, function(err, data, response) {
    var cleaned = data.statuses.map(cleanThisTweetUp).filter(function(t){
      return t && !!t.match(x) && iscool(t)
    })
    var toot = pick(cleaned)[0]
    toot = addEnder(cap(toot.replace(new RegExp(x, 'gi'), y)))
    console.log(toot)
    T.post('statuses/update', {status: toot}, function (err, data, response) {
      console.log(err)
      console.log(data)
    })
  })
}
