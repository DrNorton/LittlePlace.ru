var BaseRouter = require('./base_router').BaseRouter;
var AuthManager = require('../managers/authManager').AuthManager;
var fs = require('fs-extra');

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
                fs.ensureFile(target_path, function(err) {
                   if (err == null) {
                       fs.remove(target_path, function(err) {
                           fs.move(tmp_path, target_path, function(err) {
                               if (err) throw err;
                               // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                               var url = config.url + (target_path.substr(1));

                               self.authManager.updatePhoto(userId, url, params, function() {

                               }, function(errorMessage, errorCode) {
                                   self._sendError(res, errorMessage, errorCode);
                               });
                               response.sendResult(url);
                           });
                       });

                   } else {
                       fs.move(tmp_path, target_path, function (err) {
                           if (err) throw err;
                           // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                           var url = config.url + (target_path.substr(1));

                           self.authManager.updatePhoto(userId, url, params, function () {

                           }, function (errorMessage, errorCode) {
                               self._sendError(res, errorMessage, errorCode);
                           });
                           response.sendResult(url);
                       });
                   }
                   
                    //file has now been created, including the directory it is to be placed in
                });
                // move the file from the temporary location to the intended location

                
            } else {
                self._sendError(res, "You must be autorized",401);
            }

            break;

        case 'addeventphoto':
            if (req.session.authorized) {
                var tmp_path = req.files.thumbnail.path;
                // set where the file should actually exists - in this case it is in the "images" directory
                var target_path = './images/events/' + params.eventId + '.jpg';
                fs.ensureFile(target_path, function (err) {
                    if (err == null) {
                        fs.remove(target_path, function (err) {
                            fs.move(tmp_path, target_path, function (err) {
                                if (err) throw err;
                                // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                                var url = config.url + (target_path.substr(1));

                                self.authManager.updatePhoto(userId, url, params, function () {

                                }, function (errorMessage, errorCode) {
                                    self._sendError(res, errorMessage, errorCode);
                                });
                                response.sendResult(url);
                            });
                        });

                    } else {
                        fs.move(tmp_path, target_path, function (err) {
                            if (err) throw err;
                            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                            var url = config.url + (target_path.substr(1));

                            self.authManager.updatePhoto(userId, url, params, function () {

                            }, function (errorMessage, errorCode) {
                                self._sendError(res, errorMessage, errorCode);
                            });
                            response.sendResult(url);
                        });
                    }

                    //file has now been created, including the directory it is to be placed in
                });
                // move the file from the temporary location to the intended location


            } else {
                self._sendError(res, "You must be autorized", 401);
            }

            break;

       
        default:

            break;
    }
};

exports.UploadRouter = UploadRouter;