const User = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const { signJwt } = require ("../helpers/signJwt.js");
exports.register = (req, res,next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password,10);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    type: req.body.type,
    password: hashedPassword
  })
  newUser.save()
    .then((user) => {
      //dans le body du token, insérer l'ID du user et isAdmin
      //renvoyer en réponse uniquement le token
      const userToken = signJwt({
        id: user._id, 
        isAdmin : user.isAdmin
      }, process.env.JWT_SECRET)
      res.send({
        token: userToken
      })
    })
    .catch(err => {
      next(err);
    })
}

exports.login = (req,res) => {

    User.findOne({email: req.body.email})
      .then((user)=>{ // user dans BDD
        if(!user) {
            return res.status(404).send({
              message: "User not found",
              auth: false
            })
          }
        let isPasswordValid = bcrypt.compareSync(req.body.password,user.password);
        if(!isPasswordValid){
          return res.status(401).send({
            message: "password not valid",
            auth: false
          })
        }
        const userToken = signJwt({
          id: user._id, 
          isAdmin : user.isAdmin
        }, process.env.JWT_SECRET)
        res.send({
          auth: true,
          message : "user logged",
          token: userToken
        })
      })
      .catch((err)=>{
        res.status(400).send(err);
      })
}
