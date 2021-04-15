
let handle404 = (req, res, next) => {
    const msg = "The requested URL was not found on this server. That’s all we know."
    const err = new Error(msg);
    err["status"] = 404;
    next(err);
}

let handleErrors = (err, req, res, next) => {
    res.json({
        status: "error",
        statusCode: err.status || 500,
        message: err.message,
    });
}

module.exports = {
    handle404,
    handleErrors
}