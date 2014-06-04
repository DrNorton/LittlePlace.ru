var BaseRouter = require('./base_router').BaseRouter;
var PositionManager = require('../managers/positionManager').PositionManager;

var PositionRouter = function(config) {
    this.positionManager = new PositionManager();
};

PositionRouter.prototype = new BaseRouter();

PositionRouter.prototype._doRoute = function (action, params, response, req) {
    var userId = req.session.userId;
    switch (action) {
        case 'addmyposition':
           
            this.positionManager.addMyPosition(params,userId,function(result) {
                response.sendResult(result);
            }, function (errorMessage, errorCode) {
                response.sendError(response, errorMessage, errorCode);
            });
            break;

        case 'getfriendposition':
            this.positionManager.getFriendPosition(params,userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, errorCode) {
                response.sendError(response, errorMessage, errorCode);
            });
            break;
        
        case 'getallfriendsposition':
            this.positionManager.getAllFriendsPosition(params, userId, function(result) {
                response.sendResult(result);
            }, function(errorMessage, errorCode) {
                response.sendError(response, errorMessage, errorCode);
            });

            break;
        default:

            break;
    }
};

exports.PositionRouter = PositionRouter;