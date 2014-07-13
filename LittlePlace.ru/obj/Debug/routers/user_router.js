var BaseRouter = require('./base_router').BaseRouter;
var UserAndFriendManager = require('../managers/userAndFriendManager').UserAndFriendManager;

var UserRouter = function (config) {
    this.userAndFriendManager = new UserAndFriendManager();
};

UserRouter.prototype = new BaseRouter();

UserRouter.prototype._doRoute = function (action, params, response, req) {
    var userId = req.session.userId;
    var self = this;
    switch (action) {
        case 'getmyfriends':
            this.userAndFriendManager.getmyfriends(params, userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });
      
            break;

        case 'getme':
            this.userAndFriendManager.getme(params, userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });

            break;

        case 'getbyid':
            this.userAndFriendManager.getbyid(params, userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });

            break;

        case 'updateme':
            this.userAndFriendManager.updateme(params, userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });
            break;

        case 'addfriend':
            this.userAndFriendManager.addFriend(params, userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });


            break;
        default:

            break;
    }
};

exports.UserRouter = UserRouter;