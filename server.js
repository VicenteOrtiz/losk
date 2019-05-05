var express = require('express')
var http = require('http')
var path = require('path')
var reload = require('reload')
var bodyParser = require('body-parser')
 
var app = express()
 
app.use(express.static('./'));
 
//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));

var publicDir = path.join(__dirname, './')
 
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json()) // Parses json, multi-part (file), url-encoded
 
app.get('/', function (req, res) {
  res.sendFile(path.join(publicDir, 'index.html'))
})
 
var server = http.createServer(app)
 
// Reload code here
reload(app).then(function (reloadReturned) {
  // reloadReturned is documented in the returns API in the README
 
  // Reload started, start web server
  server.listen(3000, function () {
    console.log('Web server listening on port ' + 3000)
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})
