var http = require('http');
var sql = require('mssql'); 

var config = {
    user: 'sa',
    password: 'Rianon1990',
    server: 'scarystories.cloudapp.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'ScaryStories'
}


http.createServer(function (req, res) {
    res.writeHead(200, { 'content_type': 'text/plain' });
    
    sql.connect(config, function (err) {
        var request = new sql.Request();
        var str = "";
        request.query('select Id from CategoryDetail', function (err, recordset) {
            for (i = 0; i < recordset.length; i++) {
                str+=(recordset[i].Id.toString())+'\n';
            }
            res.end(str);
        });

    });

}).listen(process.env.port || 8080);



