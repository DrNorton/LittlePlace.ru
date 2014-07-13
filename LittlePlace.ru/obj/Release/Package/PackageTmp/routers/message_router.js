var BaseRouter = require('./base_router').BaseRouter;
var MessageManager = require('../managers/messageManager').MessageManager;


var MessageRouter = function (config) {
    this.messageManager = new MessageManager();
   
    
};

MessageRouter.prototype = new BaseRouter();

MessageRouter.prototype._doRoute = function (action, params, response, req) {
    var self = this;
    var userId = req.session.userId;
    var login = req.session.username;
    switch (action) {
        case 'addmessagetoevent':
            this.messageManager.AddMessageToEvent(params, login, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });
            break;

        case 'getmessagesfromevent':
            
            break;


        default:
            _sendError("ERROR_ACTION_REQUEST", 404);
            
            break;
    }

};

exports.MessageRouter = MessageRouter;