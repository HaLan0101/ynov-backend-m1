const errorHandle = (err, req, res, next) =>{
    console.log(err);
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).send({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV
    })
}
module.exports = errorHandle;