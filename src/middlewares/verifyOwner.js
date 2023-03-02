function verifyOwner(req, res, next){
    if(req.userToken.type == "CUSTOMER"){
        return res.status('401').send({
            auth: false,
            message: "You must be an owner"
        })
    }
    next();
}
module.exports = verifyOwner;                                  