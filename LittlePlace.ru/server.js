var http = require('http');
var sql = require('mssql');
var config = require('./settings/config').config;
var AuthRouter = require('./routers/auth_router').AuthRouter;
var PositionRouter = require("./routers/position_router").PositionRouter;
var UserRouter = require("./routers/user_router").UserRouter;

var authRouter = new AuthRouter(config);
var positionRouter = new PositionRouter(config);
var userRouter = new UserRouter(config);

var connect = require('connect');
var express = require('express')
  , app = express()
  , port = process.env.PORT || 3000;

app.use(connect.cookieParser());
app.use(connect.session({ secret: 'your secret here'} ));


app.get('/', function(req, res) {
    res.send(config.user);
});


app.get('/auth/:action', function (req, res) {
      authRouter.route(req, res);
  });

app.get('/position/:action', function (req, res) {
    if (!req.session.authorized) {
        res.end(OnError(401, "You must be autorized"));
    } else {
        positionRouter.route(req,res);
    }
});

app.get('/user/:action', function (req, res) {
    if (!req.session.authorized) {
        res.end(OnError(401, "You must be autorized"));
    } else {
        userRouter.route(req, res);
    }
});

app.listen(port, function() {
    console.log(authRouter);
    console.log('Listening on port ', port);
});

function OnError(code,text) {
    var error = ({ errorCode: code, errorMessage: text, result: "" });
    return JSON.stringify(error);
}




