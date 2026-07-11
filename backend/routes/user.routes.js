const express = require("express");
const { registerUser } = require("../controller/user.controller");
const {body} = require("express-validator")
const router = express.Router();


router.post("/register",[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be three charecter long'),
    body('password').isLength({min:6}).withMessage('Password must be six charecter long')
],
registerUser
)



module.exports = router ;