var http = require('http');
var sql = require('mssql');
config = require('./settings/config').config;
var AuthRouter = require('./routers/auth_router').AuthRouter;
var PositionRouter = require("./routers/position_router").PositionRouter;
var UserRouter = require("./routers/user_router").UserRouter;
var UploadRouter = require("./routers/upload_router").UploadRouter;

var authRouter = new AuthRouter(config);
var positionRouter = new PositionRouter(config);
var userRouter = new UserRouter(config);
var uploadRouter = new UploadRouter(config);

var fs = require('fs');

var connect = require('connect');
var express = require('express')
  , app = express()
  , port =(process.env.PORT||80);

app.use(connect.cookieParser());
app.use(connect.session({ secret: 'your secret here', maxAge: 24 * 60 * 60 * 1000, cookie: { httpOnly: false } }));
app.use(connect.bodyParser({ uploadDir: './uploads' }));


app.get('/', function(req, res) {
    res.send(config.user);
});


app.get('/auth/:action', function (req, res) {
    var test = req.session;
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

app.get('/images/avatars/:file', function (req, res) {
    if (req.session.authorized) {
        var img = fs.readFileSync('./images/avatars/' + req.params.file);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
    } else {
        userRouter.route(req, res);
    }
});

app.listen(port, function() {
    console.log(authRouter);
    console.log('Listening on port ', port);
});

app.get('/file-upload', function (req, res) {
    res.end('<html><form method="post" enctype="multipart/form-data" action="/file-upload/addavatar"> \
    <input type="file" name="thumbnail"> \
    <input type="submit">\
</form></html>');
});

app.post('/file-upload/:action', function (req, res, next) {
    uploadRouter.route(req, res);
});

function OnError(code,text) {
    var error = ({ errorCode: code, errorMessage: text, result: "" });
    return JSON.stringify(error);
}




