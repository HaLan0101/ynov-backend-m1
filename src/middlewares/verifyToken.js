const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  let token = req.headers.authorization;
    // si j'ai pas le token => renvoyer une erreur de type 403 forbidden
    if(!token){
        return res.status(403).send({
            auth: false,
            token: null,
            message:"Missing token"
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, function(error, jwtDecoded){
        if(error){
            return res.status(401).send({
                auth: false,
                token: null,
                message: "non authorized"
            })
        }
        console.log(jwtDecoded);
        req.userToken=jwtDecoded; // stocker id dans token
        next();
    });
    // permet d'excécuter un controller qui suit
    // utiliser la fonction verify de jwt
    // Ereur : le token a expiré, token modifié, secret NOK
    //if error :
    // => envoyer une erreur type 401 unauthorified
    // ...si pas d'erreur
}
module.exports = verifyToken;