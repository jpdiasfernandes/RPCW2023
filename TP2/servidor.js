var http = require('http')
var fs = require('fs')

http.createServer(function(req,res) {
  if (req.url == '/') {
    fs.readFile('index.html', function(err,data) {
      if (err) {
        res.writeHead(404, {'Content-type' : 'text/plain'})
        res.write('Erro no acesso ao ficheiro: ' + err)
      }
      else {
        res.writeHead(200, {'Content-type' : 'text/html'})
        res.write(data)
      }
      res.end()
    })
  }
  console.log(req.url.length + ' >= 8 && <= 10 ?')
  console.log('porta == ' + req.url.substring(1,6) + ' ?')
  length = req.url.length
  if (length >= 8 && length <= 10 && req.url.substring(1,6) == 'porta' && !isNaN(req.url.substring(7,8))) {
    num = req.url.substring(7,10)
    console.log('Numero : ' + num)
    fs.readFile('arqfiles/arq' + num + '.xml', function(err, data) {
      if(err) {
        res.writeHead(404, {'Content-type' : 'text/plain'})
        res.write('Erro no acesso ao ficheiro: ' + err)
      }
      else {
        res.writeHead(200, {'Content-type' : 'text/xml'})
        res.write(data)
      }
      res.end()
    })
  }
  }).listen(6201)
