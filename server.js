var http = require('http');
var sql = require('mssql');
config = require('./settings/config').config;
var AuthRouter = require('./routers/auth_router').AuthRouter;
var connect = require('connect');
var express = require('express')
  , app = express()
  , port = process.env.PORT || 3000;

app.use(connect.cookieParser());
app.use(connect.session({ secret: 'your secret here'} ));


var authRouter = new AuthRouter(config);



  app.get('/', function (req, res) {
      res.send(config.user);
  })

  app.get('/user/:id', function (req, res) {
      res.end(req.params.id);
  });

  app.get('/auth/:action', function (req, res) {
      authRouter.route(req,res);
    
     
  });

app.get('/get', function (req, res) {
  res.send('Privet!')
})

app.listen(port, function () {
    console.log('Listening on port ', port);
})




