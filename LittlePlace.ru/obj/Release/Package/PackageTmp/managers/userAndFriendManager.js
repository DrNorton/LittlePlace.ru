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




function GetMyFriendList(userId, onSuccess, onError,sqlManager) {
    var query = format('Select FriendId,Login,Photo from [LittlePlace].[dbo].[FriendLink] as link \
    Inner join [LittlePlace].[dbo].[User] as us \
on link.FriendId=us.UserId \
 where OwnerId={0}',userId);
    sqlManager.invoke(query, onSuccess, onError);
}

function AddFriend(userId,friendId, onSuccess, onError, sqlManager) {
    var query = format("INSERT INTO [LittlePlace].[dbo].[FriendLink] (OwnerId,FriendId,Created) OUTPUT Inserted.LinkId VALUES ('{0}','{1}',GETDATE())", userId, friendId);
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