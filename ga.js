var goog = require('googleapis')
var demons = goog.auth.OAuth2
var memoize = require('memoizee')
require('polyfill-promise')
var goog = require('googleapis')
var OAuth2 = goog.auth.OAuth2

var oauthClient = new OAuth2(process.env.GA_CLIENT_ID, process.env.GA_CLIENT_SECRET)
oauthClient.setCredentials({
  access_token: process.env.GA_ACCESS_TOKEN,
  refresh_token: process.env.GA_REFRESH_TOKEN
})

function getMonthlyUniques() {
    var d = new Date
    var firstOfMonth = d.getFullYear() +'-'+ pad(d.getMonth()+1, 2, 0) + '-01'

  return new Promise(function (resolve, reject) {
    goog.analytics({version: 'v3', auth: oauthClient}).data.ga.get({
      'start-date':firstOfMonth,
      'end-date':'today',
      'ids': process.env.GA_PROFILE_ID, 
      'metrics': 'ga:users'
    }, function (err, res) {
      if (err) {
        return reject(err)
      }
      return resolve(res.rows[0][0])
    })
  })
}

function pad(val, to, char) {
  var str = String(val)
  var diff = to - str.length
  if (diff <= 0) { return str }
  for (var i = 0; i < diff; i++) {
    str = char + str
  }
  return str
}

var minutes = 60 * 1000
module.exports.getMonthlyUniques = memoize(getMonthlyUniques, {maxAge: 5*minutes})
