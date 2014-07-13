var BaseRouter = require('./base_router').BaseRouter;
var EventManager = require('../managers/eventManager').EventManager;

var EventRouter = function (config) {
    this.eventManager = new EventManager();
};

EventRouter.prototype = new BaseRouter();

EventRouter.prototype._doRoute = function (action, params, response, req) {
    var self = this;
    var userId = req.session.userId;
    switch (action) {
        case 'addevent':
            this.eventManager.addEvent(userId, params, function (result) {
                response.sendResult(result[0]);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });
            break;

        case 'getmyownevents':
            this.eventManager.getMyOwnEvents(userId, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });
            break;

        case 'getmyinvitedevents':
            this.eventManager.getMyInvitedEvents(userId, params, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });
            break;

        case 'addfriendtoevent':
            this.eventManager.addFriendToEvent(userId, params,  function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });
            break;

        case 'addfriendstoevent':
            this.eventManager.addFriendsToEvent(userId, params, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });
            break;

      
        default:

            break;
    }
};

exports.EventRouter = EventRouter;