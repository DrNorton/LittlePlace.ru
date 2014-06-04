var BaseRouter = require('./base_router').BaseRouter;
var UserAndFriendManager = require('../managers/userAndFriendManager').UserAndFriendManager;

var UserRouter = function (config) {
    this.userAndFriendManager = new UserAndFriendManager();
};

UserRouter.prototype = new BaseRouter();

UserRouter.prototype._doRoute = function (action, params, response, req) {
    var userId = req.session.userId;
    switch (action) {
        case 'getmyfriends':
            this.userAndFriendManager.getmyfriends(params, userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, errorCode) {
                response.sendError(response, errorMessage, errorCode);
            });
       
            break;

        case 'getallusers':
           
            break;

        case 'addfriend':
            this.userAndFriendManager.addFriend(params, userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, errorCode) {
                response.sendError(response, errorMessage, errorCode);
            });


            break;
        default:

            break;
    }
};

exports.UserRouter = UserRouter;