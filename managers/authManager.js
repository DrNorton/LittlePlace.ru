var SqlManager = require("./sqlManager").SqlManager;
var PasswordHelper = require("./passwordHelper").PasswordHelper;


var AuthManager = function () {
    this.sqlManager = new SqlManager();
    this.passwordHelper = new PasswordHelper();
};

AuthManager.prototype.validate = function (action, params, onSuccess, onError) {
    var self = this;
    var login = params.login;
    var pass = params.pass;
    this.sqlManager.invoke('Select * from [LittlePlace].[dbo].[User] where Login=' + "'" + login + "'", function (result) {
        var md5PassFromBase = result[0].Pass;
        var userId = result[0].UserId;
        var validateResult = self.passwordHelper.validateHash(md5PassFromBase, pass);
        if (validateResult) {
            //Добавим sessionId
            var query = 'INSERT INTO [LittlePlace].[dbo].[Session] (SessionId, UserId,Created,EndLifeTime)   OUTPUT Inserted.SessionId VALUES (NEWID(),' + userId + ',GETDATE(),dateadd(day,5,getdate())' + ')';
            console.log(query);
            self.sqlManager.invoke(query, function (sessionInfo) {
                onSuccess(JSON.stringify(sessionInfo));
            }, function (err, code) {
                onError(err, code);
            });
        }
        else {
            onError("Bad Login", 401);
        }

    }, function (err, code) {
        onError(err, code);
    });

}

AuthManager.prototype.register = function (action, params, onSuccess, onError) {
    var self = this;
    var login = params.login;
    var pass = params.pass;
    //чекаем логин на соответствие
   
    FindLogin(login,function(result){
         onError("loginExists", 0);
        
    },function(){
       InsertLogin(login, pass, onError, onSuccess, self.sqlManager, self.passwordHelper);
    },onError,self.sqlManager);
  
}



function FindLogin(login,onSuccess,onFail,onError,sqlManager){
    sqlManager.invoke('Select * from [LittlePlace].[dbo].[User] where Login=' + "'" + login + "'", function (result) {
        if (result.length == 0) {
            onFail();
        }
        else {
            onSuccess(result);
        }

    }, function (err, code) {
        onError(err, code);
    });
};

function InsertLogin(login,pass,onError,onSuccess,sqlManager,passwordHelper){
     var md5hash = passwordHelper.createHash(pass);
     var query = "INSERT INTO [LittlePlace].[dbo].[User] (Login,Pass) OUTPUT Inserted.UserId VALUES ('" + login + "','" + md5hash + "')";
     sqlManager.invoke(query, function (result) {
         onSuccess(result);
     }, function (err, code) {
         onError(err, code);
     });
};


exports.AuthManager = AuthManager;