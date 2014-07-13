var BaseRouter = require('./base_router').BaseRouter;
var NewsManager = require('../managers/newsManager').NewsManager;

var NewsRouter = function (config) {
    this.newsManager = new NewsManager();

};

NewsRouter.prototype = new BaseRouter();

NewsRouter.prototype._doRoute = function (action, params, response, req) {
    var self = this;

    switch (action) {
        case 'getallnews':
            this.newsManager.getAllNews(params, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });

            break;

        case 'getbyid':
            this.newsManager.getById(params, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });

            break;


        default:
            _sendError("ERROR_ACTION_REQUEST", 404);

            break;
    }

};


exports.NewsRouter = NewsRouter;