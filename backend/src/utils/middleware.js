function myLogger(req, res, next){
    console.log("LOGGED")
    next()
}

function requestTime(req, res, next){
    req.requestTime = Date.now()
    console.log(req.path)
    next()
}


module.exports={
    myLogger, requestTime, responseTime
}