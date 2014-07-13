var SqlManager = require("./sqlManager").SqlManager;


var NewsManager = function () {
    this.sqlManager = new SqlManager();
};

NewsManager.prototype.getAllNews = function(params, onSuccess, onError) {
    var self = this;
    GetAll(onSuccess, onError, self.sqlManager);
};

NewsManager.prototype.getById = function (params, onSuccess, onError) {
    var self = this;
    var newsid = params.newsId;
    GetById(newsid, function(result) {
        onSuccess(result[0]);
    }, onError, self.sqlManager);
};

function GetById(newsId, onSuccess, onError, sqlManager) {
    var query = format('Select * from [littleplace_db].[dbo].[News] \
 where Id={0}', newsId);
    sqlManager.invoke(query, onSuccess, onError);
}

function GetAll(onSuccess, onError, sqlManager) {
    var query = 'Select * from [littleplace_db].[dbo].[News]';
    sqlManager.invoke(query, onSuccess, onError);
}

function format() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}
exports.NewsManager = NewsManager;