var SqlManager = require("./sqlManager").SqlManager;


var PositionManager = function() {
    this.sqlManager = new SqlManager();
};

PositionManager.prototype.addMyPosition = function(params,userId, onSuccess, onError) {
    var self = this;
    var latitude = params.latitude;
    var longitude = params.longitude;
    InsertMyPosition(latitude, longitude, userId, self.sqlManager, function (result) {
        var positionId = result[0].PositionId;
        AddPositionToPositionsHistory(positionId, userId, self.sqlManager, function(result) {
            UpdateUserLastPosition(userId, positionId, self.sqlManager, onSuccess, onError);
        }, onError);
    
    }, onError);
};

PositionManager.prototype.getAllFriendsPosition = function(params, userId, onSuccess, onError) {
    var self = this;
    GetFriendsList(userId, onSuccess, onError, self.sqlManager);
};

PositionManager.prototype.getFriendPosition = function (params, userId, onSuccess, onError) {
    //Проверяем может ли пользователь запрашивать положение друга(есть ли он в списке друзяшек)
    var self = this;
    var friendId = params.friendId;
    CheckFriendInFriendsList(userId,friendId,function(result) {
        if (result.length > 0) {
            //Выдаём положение
            GetFriendPositionId(friendId, self.sqlManager, function(result) {
                if (result.length > 0) {
                    GetFriendPositionById(result[0].LastPosition, self.sqlManager, onSuccess, onError);
                } else {
                    onError("Position not finded", 401);
                }
            }, onError);
        } else {
            onError("Friend not finded in you friend list",401);
        }
    }, onError,self.sqlManager);
    
};

function GetFriendPositionId(friendId, sqlManager, onSuccess, onError) {
    var query = format("Select LastPosition from [littleplace_db].[dbo].[User] where UserId={0}", friendId);
    sqlManager.invoke(query, onSuccess, onError);
};

function GetFriendPositionById(positionId,sqlManager,onSuccess,onError) {
    var query = format("Select Latitude,Longitude,Time,Description from [littleplace_db].[dbo].[Position] where PositionId={0}", positionId);
    sqlManager.invoke(query, onSuccess, onError);
};

function InsertMyPosition(latitude,longitude,userId,sqlManager,onSuccess,onError) {
    var query = format("INSERT INTO [littleplace_db].[dbo].[Position] (Latitude,Longitude,Time,Description) OUTPUT Inserted.PositionId VALUES ('{0}','{1}',{2},'empty')", latitude, longitude, "GETDATE()");
    sqlManager.invoke(query, onSuccess,onError);
};

function CheckFriendInFriendsList(userId,friendId,onSuccess,onError,sqlManager) {
    var query = format("Select * from [littleplace_db].[dbo].[FriendLink] where OwnerId={0} And FriendId={1}", userId,friendId);
    sqlManager.invoke(query, onSuccess, onError);
}

function GetFriendsList(userId, onSuccess, onError, sqlManager) {
    var query = format('Select UserId as FriendId,Latitude,Longitude,Description from [littleplace_db].[dbo].[FriendLink] as link Inner join [littleplace_db].[dbo].[User] as us \
on link.FriendId=us.UserId \
Inner join [littleplace_db].[dbo].[Position] as pos \
on us.LastPosition=pos.PositionId \
 where OwnerId={0}',userId);
    sqlManager.invoke(query, onSuccess, onError);
}

function AddPositionToPositionsHistory(positionId,userId,sqlManager,onSuccess,onError) {
    var query = format("INSERT INTO [littleplace_db].[dbo].[PositionHistory] (UserId,PositionId,Created) OUTPUT Inserted.PositionHistoryId VALUES ('{0}','{1}',{2})", userId, positionId, "GETDATE()");
    sqlManager.invoke(query, onSuccess, onError);
};

function UpdateUserLastPosition(userId, lastPositionId, sqlManager, onSuccess, onError) {
    var query = format("UPDATE [littleplace_db].[dbo].[User] SET LastPosition={0} WHERE UserId={1}", lastPositionId,userId);
    sqlManager.invoke(query, onSuccess, onError);
};

function format () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}

exports.PositionManager = PositionManager;

