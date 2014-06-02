
var Response = function(response) {
    this.response=response;
};

Response.prototype.sendError = function(errorCode, errorNum) {
    console.log(errorCode);
    if (!errorNum)
        errorNum=500;
    //this.response.json(errorNum,{ status:'error', message:errorCode });
 
     this.response.json({ errorCode:errorNum,errorMessage:'Error',result:"" });
};

Response.prototype.sendResult = function(result) {
    console.log(result);
    this.response.json({ errorCode:'0',errorMessage:'',result:result });
};

exports.Response = Response;