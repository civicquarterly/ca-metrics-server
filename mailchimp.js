var mailchimp = require('mailchimp').MailChimpAPI
require('polyfill-promise')
var memoize = require('memoizee')

var key = process.env.MAILCHIMP_KEY
var listId = process.env.MAILCHIMP_LIST_ID

function getEmailSubscriberCount() {
  return new Promise(function(resolve, reject) {

    try {
      var api = new mailchimp(key, {version: '2.0'})
    } catch (e) {
      return reject(e)
    }

    api.call('lists','growth-history',
      // {id: listId}, // this is optional
      function (err, data) {
        if (err) { return reject(err) }

          var month = data[data.length-1]

          var total = parseInt(month.existing) +
                      parseInt(month.optins) +
                      parseInt(month.imports)

          resolve(total)
      })

  })
}

var minutes = 60 * 1000
module.exports.getEmailSubscriberCount = memoize(getEmailSubscriberCount, {maxAge: 5*minutes})
