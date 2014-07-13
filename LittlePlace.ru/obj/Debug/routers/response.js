
var Response = function(response) {
    this.response=response;
};

Response.prototype.sendError = function(errorMessage, errorCode) {
    console.log(errorCode);
    if (!errorCode)
        errorNum=500;
    //this.response.json(errorNum,{ status:'error', message:errorCode });
 
     this.response.json({ errorCode:errorCode,errorMessage:errorMessage,result:"" });
};

Response.prototype.sendResult = function(result) {
    //console.log(result);
    var res = { errorCode: '0', errorMessage: '', result: result };
    this.response.end(JSON.stringify(res));
    
};

exports.Response = Response;