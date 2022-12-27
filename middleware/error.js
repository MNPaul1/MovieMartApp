const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err,req,res,next) =>{
    let error = {...err}
    error.message = err.message
    console.log(err.stack)
    const {status} = err.response
    console.log(status)
    if(status===401){
        const message = "Server down, due to some difficulties while connecting to the APIs."
        error = new ErrorResponse(message, 401)
    }
    else if(status===404){
        const message = "The resource you requested could not be found."
        error = new ErrorResponse(message,404)
    }
    
    res.status(error.statusCode||500).json({
        success: false,
        error: error.message||"Server Error"
    })
}

module.exports = errorHandler;