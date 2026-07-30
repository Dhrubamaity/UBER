const blacklistTokenModel = require("../models/blacklistToken");
const captainModel = require("../models/captainModel");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator")

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if (isCaptainAlreadyExist) {
        return res.status(401).json({ message: "Email alreday exist" })
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    return res.status(201).json({ token, captain });
}
module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    const Captain = await captainModel.findOne({email}).select('+password');
    if(!Captain){
        return res.status(401).json({message:"Invalid Email or Password"})
    }

    const isPasswordMatch = await Captain.comparePassword(password)
    if(!isPasswordMatch){
        return res.status(401).json({message:"Invalid Email or Password"})
    }
    const token = Captain.generateAuthToken();
    res.cookie("token",token)
    return res.status(201).json({token, Captain})
}

module.exports.getCaptainProfile = async(req,res,next)=>{
    return res.status(201).json(req.Captain)
}
module.exports.logoutCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token})
    res.clearCookie("token")
    return res.status(201).json({message:"Captain loged out"})
}