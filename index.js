var restify = require('restify')
var info = require('./package.json')
var resolved = require('resolved')

var ga = require('./ga')
var stripe = require('./stripe')


var server = restify.createServer({
  name: info.name,
  version: info.version
})

server.use(restify.CORS({origins:['*']}));

server.get('/metrics.json', function (req, res) {
  resolved({
    monthlyUniques: ga.getMonthlyUniques(),
    subscribers: stripe.getSubscriberCount()
  }).then(function (metrics) {
    res.send(metrics)
  })
  .catch(function (err) {
    console.error(err)
    res.send(500,'Server Error')
  })
})

server.listen(process.env.PORT, function () {
  console.log('%s listening on %s', server.name, server.url)
})