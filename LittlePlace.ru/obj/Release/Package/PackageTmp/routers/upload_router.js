var BaseRouter = require('./base_router').BaseRouter;
var AuthManager = require('../managers/authManager').AuthManager;
var fs = require('fs');

var UploadRouter = function (config) {
    this.authManager = new AuthManager();
};

UploadRouter.prototype = new BaseRouter();

UploadRouter.prototype._doRoute = function (action, params, response, req) {
    var self = this;
    var userId = req.session.userId;
    switch (action) {
        case 'addavatar':
            if (req.session.authorized) {
                var tmp_path = req.files.thumbnail.path;
                // set where the file should actually exists - in this case it is in the "images" directory
                var target_path = './images/avatars/' + req.session.userId + '.jpg';
                // move the file from the temporary location to the intended location
                fs.rename(tmp_path, target_path, function (err) {
                    if (err) throw err;
                    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                    var url = config.url + (target_path.substr(1));
                    fs.unlink(tmp_path, function () {
                        if (err) throw err;
                      
                        self.authManager.updatePhoto(userId,url, params, function () {

                        }, function(errorMessage,errorCode) {
                            self._sendError(res, errorMessage, errorCode);
                        });
                        response.sendResult(url);
                    });
                });
            } else {
                self._sendError(res, "You must be autorized",401);
            }

            break;

       
        default:

            break;
    }
};

exports.UploadRouter = UploadRouter;