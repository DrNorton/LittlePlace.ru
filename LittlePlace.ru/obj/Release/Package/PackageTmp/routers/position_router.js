var BaseRouter = require('./base_router').BaseRouter;
var PositionManager = require('../managers/positionManager').PositionManager;

var PositionRouter = function(config) {
    this.positionManager = new PositionManager();
};

PositionRouter.prototype = new BaseRouter();

PositionRouter.prototype._doRoute = function (action, params, response, req) {
    var self = this;
    var userId = req.session.userId;
    switch (action) {
        case 'addmyposition':
           
            this.positionManager.addMyPosition(params,userId,function(result) {
                response.sendResult(result);
            }, function(errorMessage,code) {
                self._sendError(response, errorMessage, code);
            });
            break;

        case 'getfriendposition':
            this.positionManager.getFriendPosition(params,userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });
            break;
        
        case 'getallfriendsposition':
            this.positionManager.getAllFriendsPosition(params, userId, function(result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });

            break;
        default:

            break;
    }
};

exports.PositionRouter = PositionRouter;