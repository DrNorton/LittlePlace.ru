var BaseRouter = require('./base_router').BaseRouter;
var AuthManager=require('./authManager').AuthManager;



var AuthRouter = function (config) {
    this.authManager = new AuthManager();
   
    
};

AuthRouter.prototype = new BaseRouter();

AuthRouter.prototype._doRoute = function (action, params, response) {

    switch (action) {
        case 'validate':
            this.authManager.validate(action, params, function (sessionId) {
              response.sendResult(sessionId);
            },
            function (errorMessage) {
                response.sendError(response,"BAD LOGIN",401);
            });
            response.sendResult("validate complete");
            break;

        case 'register':
            response.sendResult("register complete");
            break;

        default:
            response.sendError(response,"ERROR_ACTION_REQUEST",404);
            break;
    }

};




exports.AuthRouter = AuthRouter;