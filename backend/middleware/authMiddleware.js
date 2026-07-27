const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"user not authorized by token"})
    }
    const isBlacklisted = await userModel.findOne({token: token});
    if (isBlacklisted){
        res.status(401).json({message:"Token is expaired or blacklisted"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        req.user = user;
        return next();
    } catch(err){
        return res.status(401).json({message:"unauthorized",error:err.message})
    }
}