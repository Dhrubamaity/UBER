const userModel = require("../models/user")
const userService = require("../services/user.service")
const { validationResult } = require("express-validator")

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };
    const { fullname, email, password } = req.body;
    console.log(fullname)
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,   
        email,
        password: hashedPassword
    });

    const Token = user.generateAuthToken();
     res.send(201).json({Token, user});
}