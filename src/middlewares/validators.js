const { body,validationResult } = require("express-validator");
const User = require("../models/user.model.js");
exports.checkAuth = [
    body("lastName")
        .exists()
        .withMessage("Last name is required")
        .isAlphanumeric()
        .isLength({
            min :2,
            max: 50
        })
        .withMessage("Last name wrong format"),
    body("firstName")
        .exists()
        .withMessage("First name is required")
        .isAlphanumeric()
        .isLength({
            min :2,
            max: 50
        })
        .withMessage("First name wrong format"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
          })
        .withMessage("Password invalid"),
    body("email")
        .exists()
        .withMessage("Email name is required")
        .isEmail()
        .withMessage("Provide valid email")
        // .custom(value => {
        //     return User.findOne({ where: {email: value} })
        //     .then(() => {
        //         return Promise.reject('Email already taken')
        //     })
        // }) 
]
exports.validation = (req,res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}
