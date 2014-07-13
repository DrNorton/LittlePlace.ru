var BaseRouter = require('./base_router').BaseRouter;
var AuthManager=require('../managers/authManager').AuthManager;



var AuthRouter = function (config) {
    this.authManager = new AuthManager();
   
    
};

AuthRouter.prototype = new BaseRouter();

AuthRouter.prototype._doRoute = function (action, params, response, req) {
    var self = this;
    switch (action) {
        case 'logon':
            this.authManager.logon(params, function (login,userId) {
                req.session.authorized = true;
                req.session.username = login;
                req.session.userId=userId;
                response.sendResult(login);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });

            break;

        case 'register':
            this.authManager.register(params, function (result) {
                response.sendResult(result);
            }, function (errorMessage, code) {
                self._sendError(response, errorMessage, code);
            });

            break;

        case 'logoff':
                delete req.session.authorized;
                delete req.session.username ;
            break;

        default:
            _sendError("ERROR_ACTION_REQUEST", 404);
           
            break;
    }

};




exports.AuthRouter = AuthRouter;