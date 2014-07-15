var mongoose = require('mongoose');
mongoose.connect('mongodb://MongoLab-b:Azu6rm2Bvr9V5EufleruqCZQS3ZOHqLBAsbjLtHSh2o-@ds050087.mongolab.com:50087/MongoLab-b');

var MessageSchema = new mongoose.Schema({
    MessageText: String,
    Login: String,
    SentTime: Date,
    EventId:Number

});

var PrivateMessageSchema = new mongoose.Schema({
    MessageText: String,
    FromId: Number,
    ToId:Number,
    SentTime: Date
    
});

var DialogSchema = new mongoose.Schema({
    CreatorId: Number,
    Members: [MemberSchema],
    Messages: [PrivateMessageSchema]
});

var MemberSchema = new mongoose.Schema({
    MemberId: Number,
    Login:String
});



var Message = mongoose.model('Message', MessageSchema);
var Dialog = mongoose.model('Dialog', DialogSchema);
var PrivateMessage = mongoose.model('PrivateMessage', PrivateMessageSchema);
var Member = mongoose.model('Member', MemberSchema);

var MessageManager = function () {
    //var dialog = new Dialog();
    //var member1 = { MemberId: 1 };
    //var member2 = { MemberId: 3 };
    //dialog.Members.push(member1);
    //dialog.Members.push(member2);
    //var obj = { MessageText: "hi", FromId: 1, ToId: 2, SentTime: new Date() };
    //var obj1 = { MessageText: "hallo", FromId: 2, ToId: 1, SentTime: new Date() };
    //var obj2 = { MessageText: "how are you", FromId: 1, ToId: 2, SentTime: new Date() };
    //dialog.Messages.push(obj);
    //dialog.Messages.push(obj1);
    //dialog.Messages.push(obj2);
    //dialog.save();
   
};



MessageManager.prototype.AddMessageToEvent = function (params, login, onSuccess, onError) {
    var obj = { MessageText: params.message, Login: login, SentTime: new Date(), EventId: params.eventid };
    var message = new Message(obj);
    message.save(function(err, data) {
        if (err) {
            onError(err);
        } else {
            onSuccess("success");
        }
    });

};

MessageManager.prototype.GetMessagesFromEvent = function (params, login, onSuccess, onError) {
    Message.find({EventId: params.eventid},function(err, messages) {
     if (err) {
         OnError(err);
     } else {
         onSuccess(messages);
     }
    });
};

MessageManager.prototype.SentPrivateMessage = function (userId,params, onSuccess, onError) {
  

};

MessageManager.prototype.GetAllMyDialogs = function(userId, params, onSuccess, onError) {
    
};

MessageManager.prototype.GetMyDialogs = function (userId, params, onSuccess, onError) {
    Dialog.find({ 'Members.MemberId': parseInt(params.id) }, function (err, dialog) {
        if (err) {
            OnError(err);
        } else {
            onSuccess(dialog);
        }
    });

};

MessageManager.prototype.GetMyPrivateMessages = function (userId, params, onSuccess, onError) {
    Dialog.find({ 'Members.MemberId': parseInt(params.id) }, function (err, dialog) {
        if (err) {
            OnError(err);
        } else {
            onSuccess(dialog);
        }
    });
   
};


exports.MessageManager = MessageManager;