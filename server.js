var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'content_type': 'text/plain' });
    res.end("Hello World");
   
}).listen(process.env.port||8080);