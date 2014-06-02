
var AuthManager = function () {
   sql.connect(config, function (err) {
        var request = new sql.Request();
        request.query('select * from [LittlePlace].[dbo].[User]', function (err, recordset) {
               
            res.end(JSON.stringify(recordset));
        });

    });
};

AuthManager.prototype.validate = function (action, params, onSuccess, onError) {
    var login = params.login;
    var pass = params.pass;

}
exports.AuthManager = AuthManager;