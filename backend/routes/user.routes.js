const express = require("express");
const { registerUser, loginUser, getUserProfile, logoutUser } = require("../controller/user.controller");
const {body} = require("express-validator");
const userModel = require("../models/user");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")


router.post("/register",[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be three charecter long'),
    body('password').isLength({min:6}).withMessage('Password must be six charecter long')
],
registerUser
)

router.post("/login",[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be three charecter long'),
    body('password').isLength({min:6}).withMessage('Password must be six charecter long')
],
loginUser
)

router.get("/profile", authMiddleware.authUser , getUserProfile)
router.get("/logout", authMiddleware.authUser , logoutUser)

module.exports = router ;