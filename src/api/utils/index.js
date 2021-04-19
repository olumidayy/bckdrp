//Middleware to handle 404 errors
let handle404 = (req, res, next) => {
    const msg = "The requested URL was not found on this server. That’s all we know."
    const err = new Error(msg);
    err["status"] = 404;
    next(err);
}

//Middleware to handle all other errors
let handleErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: "error",
        statusCode: err.status || 500,
        message: err.message,
    });
}

module.exports = {
    handle404,
    handleErrors
}