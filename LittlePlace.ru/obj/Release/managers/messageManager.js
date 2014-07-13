var mongoose = require('mongoose');
mongoose.connect('mongodb://MongoLab-b:Azu6rm2Bvr9V5EufleruqCZQS3ZOHqLBAsbjLtHSh2o-@ds050087.mongolab.com:50087/MongoLab-b');

var MessageSchema = new mongoose.Schema({
    messageText: String,
    Login: String,
    SentTime: Date

});

var MessageManager = function () {
 
};



MessageManager.prototype.AddMessageToEvent = function (params,login, onSuccess, onError) {
    var message = new MessageSchema({messageText:params.message,Login:login,SentTime:getDateTime()});


};

function getDateTime() {
    
    var date = new Date();
    
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    
    var year = date.getFullYear();
    
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}


exports.MessageManager = MessageManager;