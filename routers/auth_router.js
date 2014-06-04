var BaseRouter = require('./base_router').BaseRouter;
var AuthManager=require('../managers/authManager').AuthManager;



var AuthRouter = function (config) {
    this.authManager = new AuthManager();
   
    
};

AuthRouter.prototype = new BaseRouter();

AuthRouter.prototype._doRoute = function (action, params, response) {

    switch (action) {
        case 'validate':
            this.authManager.validate(action, params, function (result) {
                response.sendResult(result);
            },
            function (errorMessage, errorCode) {
                response.sendError(response, errorMessage, errorCode);
            });

            break;

        case 'register':
            this.authManager.register(action, params, function (result) {
                  response.sendResult(result);
            },function (errorMessage, errorCode) {
                 response.sendError(response, errorMessage, errorCode);
            });

            break;

        default:
            response.sendError(response, "ERROR_ACTION_REQUEST", 404);
            break;
    }

};




exports.AuthRouter = AuthRouter;