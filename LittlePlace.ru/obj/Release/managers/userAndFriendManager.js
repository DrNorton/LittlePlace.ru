var SqlManager = require("./sqlManager").SqlManager;

var UserAndFriendManager = function () {
    this.sqlManager = new SqlManager();
};

UserAndFriendManager.prototype.getmyfriends = function (params, userId, onSuccess, onError) {
    var self = this;
    GetMyFriendList(userId, onSuccess, onError, self.sqlManager);
};

UserAndFriendManager.prototype.addFriend = function (params, userId, onSuccess, onError) {
    var self = this;
    var friendId = params.friendId;
    AddFriend(userId, friendId, onSuccess, onError, self.sqlManager);
};



UserAndFriendManager.prototype.getme = function (params, userId, onSuccess, onError) {
    var self = this;
    GetMe(userId, function(result) {
        onSuccess(result[0]);
    }, onError, self.sqlManager);
};

UserAndFriendManager.prototype.updateme = function (params, userId, onSuccess, onError) {
    var self = this;
    UpdateMe(userId,params.login,params.photo,params.firstname,params.lastname,params.telephonenumber,params.email, onSuccess, onError, self.sqlManager);
};

UserAndFriendManager.prototype.getbyid = function (params, userId, onSuccess, onError) {
    var self = this;
    var friendId = params.friendId;
    GetById(userId, friendId, function(result) {
        onSuccess(result[0]);
    }, onError, self.sqlManager);
};

function GetById(userId,friendId, onSuccess, onError, sqlManager) {
    var query = format('Select [UserId],[Login],[Photo],[FirstName],[LastName],[TelephoneNumber],[Email],[TextStatus] from [littleplace_db].[dbo].[User] \
 where UserId={0}', friendId);
    sqlManager.invoke(query, onSuccess, onError);
}

function GetMe(userId, onSuccess, onError, sqlManager) {
    var query = format('Select [UserId],[Login],[Photo],[FirstName],[LastName],[TelephoneNumber],[Email],[TextStatus] from [littleplace_db].[dbo].[User] \
 where UserId={0}', userId);
    sqlManager.invoke(query, onSuccess, onError);
}

function GetMe(userId, onSuccess, onError, sqlManager) {
    var query = format('Select [UserId],[Login],[Photo],[FirstName],[LastName],[TelephoneNumber],[Email],[TextStatus] from [littleplace_db].[dbo].[User] \
 where UserId={0}', userId);
    sqlManager.invoke(query, onSuccess, onError);
}

function UpdateMe(userId,login,photo,firstname,lastname,telephonenumber,email, onSuccess, onError, sqlManager) {
    var query = format("Update  [littleplace_db].[dbo].[User] Set [Login]='{0}',[Photo]='{1}',[FirstName]='{2}',[LastName]='{3}',[TelephoneNumber]='{4}',[Email]='{5}'  \
 where UserId={6}", login,photo,firstname,lastname,telephonenumber,email,userId);
    sqlManager.invoke(query, onSuccess, onError);
}


function GetMyFriendList(userId, onSuccess, onError,sqlManager) {
    var query = format('Select UserId,[Login],[Photo],[FirstName],[LastName],[TelephoneNumber],[Email],[TextStatus] from [littleplace_db].[dbo].[FriendLink] as link \
    Inner join [littleplace_db].[dbo].[User] as us \
on link.FriendId=us.UserId \
 where OwnerId={0}', userId);
    sqlManager.invoke(query, onSuccess, onError);
}

function AddFriend(userId,friendId, onSuccess, onError, sqlManager) {
    var query = format("INSERT INTO [littleplace_db].[dbo].[FriendLink] (OwnerId,FriendId,Created) OUTPUT Inserted.LinkId VALUES ('{0}','{1}',GETDATE())", userId, friendId);
    sqlManager.invoke(query, onSuccess, onError);
}



function format() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}


exports.UserAndFriendManager = UserAndFriendManager;