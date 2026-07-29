const blacklistToken = require("../models/blacklistToken");
const userModel = require("../models/user")
const userService = require("../services/user.service")
const { validationResult } = require("express-validator")

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };
    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne(email);
    if(isUserAlreadyExist){
        return res.status(401).json({message:"User already exist"})
    }
    
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const Token = user.generateAuthToken();
    return res.status(201).json({ Token, user });
}


module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return(res.ststus(400).json({errors:errors.array()}))
    }

    const {email,password}= req.body;
    const user = await userModel.findOne({email}).select("+password");
    if(!user){
        return(res.status(401).json({message:"Inavalid email or password"}));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return(res.status(401).json({message:"Inavalid email or password"}));
    }

    const token = user.generateAuthToken();
    res.cookie("token",token)
    res.status(200).json({token, user})
}


module.exports.getUserProfile = async(req,res,next)=>{
    return res.status(201).json(req.user)
}

module.exports.logoutUser = async(req,res,nest)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log(token);
    res.clearCookie("token")
    await blacklistToken.create({token});

    res.status(200).json({messag:"User Logedout"})
}