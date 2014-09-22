var stripe = require('stripe-cohort')
var key = process.env.STRIPE_KEY
require('polyfill-promise')
var memoize = require('memoizee')

function getSubscriberCount() {
  return new Promise(function(resolve, reject) {
    stripe(key)(new Date(0), new Date(), function (err, customers) {
      if (err) { return reject(err) }

      resolve(customers.subscriptions().count())
    })
  })
}

var minutes = 60 * 1000
module.exports.getSubscriberCount = memoize(getSubscriberCount, {maxAge: 5*minutes})
