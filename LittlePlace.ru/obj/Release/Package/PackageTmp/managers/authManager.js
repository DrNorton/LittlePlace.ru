var SqlManager = require("./sqlManager").SqlManager;
var PasswordHelper = require("./passwordHelper").PasswordHelper;


var AuthManager = function () {
    this.sqlManager = new SqlManager();
    this.passwordHelper = new PasswordHelper();
};


AuthManager.prototype.logon = function(params, onSuccess, onError) {
    var self = this;
    var login = params.login;
    var pass = params.pass;
    FindLogin(login, function(result) {
        var md5PassFromBase = result[0].Pass;
        var userId = result[0].UserId;
        var validateResult = self.passwordHelper.validateHash(md5PassFromBase, pass);
        if (validateResult) {
            //Добавим sessionId
            onSuccess(login,userId);
        } else {
            onError("Bad Login", 401);
        }
    }, function() {
        onError("Bad Login", 401);
    }, onError, self.sqlManager);

};


AuthManager.prototype.register = function(params, onSuccess, onError) {
    var self = this;
    var login = params.login;
    var pass = params.pass;
    //чекаем логин на соответствие

    FindLogin(login, function(result) {
        onError("loginExists", 0);

    }, function() {
        InsertLogin(login, pass, onError, onSuccess, self.sqlManager, self.passwordHelper);
    }, onError, self.sqlManager);

};

AuthManager.prototype.updatePhoto = function (userId, photoUrl, params, onSuccess, onError) {
    var self = this;
    UpdateAvatar(userId, photoUrl, onSuccess,onError, self.sqlManager);
};


function FindLogin(login,onSuccess,onFail,onError,sqlManager){
    sqlManager.invoke('Select * from [LittlePlace].[dbo].[User] where Login=' + "'" + login + "'", function (result) {
        if (result.length == 0) {
            onFail();
        }
        else {
            onSuccess(result);
        }

    }, onError);
};

function UpdateAvatar(userId, url, onSuccess, onError, sqlManager) {
    var query = "Update [LittlePlace].[dbo].[User] Set Photo='" + url + "'" + " where UserId=" + userId;
    sqlManager.invoke(query, function (result) {
        if (result.length == 0) {
            onFail();
        }
        else {
            onSuccess(result);
        }

    }, onError);
};

function InsertLogin(login,pass,onError,onSuccess,sqlManager,passwordHelper){
     var md5hash = passwordHelper.createHash(pass);
     var query = "INSERT INTO [LittlePlace].[dbo].[User] (Login,Pass) OUTPUT Inserted.UserId VALUES ('" + login + "','" + md5hash + "')";
     sqlManager.invoke(query,onSuccess,onError);
    
};


exports.AuthManager = AuthManager;