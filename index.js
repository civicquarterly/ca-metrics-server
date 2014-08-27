var restify = require('restify')
var info = require('./package.json')
var resolved = require('resolved')

var ga = require('./ga')


var server = restify.createServer({
  name: info.name,
  version: info.version
})

server.use(restify.CORS({origins:['*']}));

server.get('/metrics.json', function (req, res) {
  resolved({
    monthlyUniques: ga.getMonthlyUniques()
  }).then(function (metrics) {
    res.send(metrics)
  })
})

server.listen(process.env.PORT, function () {
  console.log('%s listening on %s', server.name, server.url)
})