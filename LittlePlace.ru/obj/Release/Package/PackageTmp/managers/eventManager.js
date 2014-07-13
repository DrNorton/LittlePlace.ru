var SqlManager = require("./sqlManager").SqlManager;

var EventManager = function (config) {
    this.sqlManager = new SqlManager();
};

EventManager.prototype.addEvent = function (userId,params, onSuccess, onError) {
    var self = this;
    AddEvent(params.name, params.eventime,
         params.latitude,
         params.longitude,
         userId,
         params.address,
         params.description,
         onSuccess, onError, self.sqlManager);
};

EventManager.prototype.addFriendToEvent = function (userId, params, onSuccess, onError) {
    var self = this;
    AddFriendToEvent(params.friendId, params.eventId,
         onSuccess, onError, self.sqlManager);
};

EventManager.prototype.addFriendsToEvent = function (userId, params, onSuccess, onError) {
    var self = this;
    AddFriendsToEvent(params.friends, params.eventId,
         onSuccess, onError, self.sqlManager);
};

EventManager.prototype.getMyOwnEvents = function (userId, onSuccess, onError) {
    var self = this;
    GetMyOwnEvents(userId,onSuccess, onError, self.sqlManager);
};

EventManager.prototype.getMyInvitedEvents = function (userId, params, onSuccess, onError) {
    var self = this;
    GetMyInvitedEvents(userId, onSuccess, onError, self.sqlManager);
};

function AddEvent(name,eventTime,latitude,longitude,ownerId,address,description,onSuccess, onError, sqlManager) {
   
    var query = format("Insert into [littleplace_db].[dbo].[Event] (Name,Created,EventTime,Latitude,Longitude,OwnerId,Address,Description) OUTPUT Inserted.EventId Values ('{0}',{1},{2},{3},{4},{5},N'{6}',N'{7}')  ", name, "GETDATE()", "GETDATE()", latitude, longitude, ownerId, address, description);
    sqlManager.invoke(query, onSuccess, onError);
}

function AddFriendToEvent(friendId, eventId, onSuccess, onError, sqlManager) {
    //Добавить проверку
    var query = format("Insert into [littleplace_db].[dbo].[EventMember] (MemberId,EventId) Values ({0},{1})  ", friendId,eventId);
    sqlManager.invoke(query, onSuccess, onError);
}

function AddFriendsToEvent(friends, eventId, onSuccess, onError, sqlManager) {
    var str = "Insert into [littleplace_db].[dbo].[EventMember] (MemberId,EventId) Values";
    
    var json = JSON.parse(friends);
    for (var i = 0; i < json.length; i++) {
        str += format(" ({0},{1})", json[i], eventId);
        if (i != json.length-1) {
            str += ",";
        }
    }

    sqlManager.invoke(str, onSuccess, onError);
}

function GetMyOwnEvents(myId,onSuccess, onError, sqlManager) {
    var query = format('Select * from [littleplace_db].[dbo].[Event] Where OwnerId={0}', myId);
    sqlManager.invoke(query, onSuccess, onError);
}

function GetMyInvitedEvents(myId, onSuccess, onError, sqlManager) {
    var query = format('Select * from [littleplace_db].[dbo].[Event] as link \
    Inner join [littleplace_db].[dbo].[EventMember] as us on link.EventId=us.EventId \
    where us.MemberId={0}',myId);
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

exports.EventManager = EventManager;