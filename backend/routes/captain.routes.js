const express = require("express");
const { body } = require("express-validator");
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require("../controller/captain.controller");
const { authCaptain } = require("../middleware/authMiddleware");
const router = express.Router()


router.post("/register",[
    body("email").isEmail().withMessage("Invalid email or password"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 charecter long"),
    body("fullname.firstname").isLength({min:3}).withMessage("Fullname must be at least 3 charecter long"),
    body("vehicle.vehicleType").isIn(["car", "bike", "auto"]).withMessage("Choose the vehicle type poperly"),
    body("vehicle.color").isLength({min:3}).withMessage("Color must be at least 3 charecter long"),
    body("vehicle.plate").isLength({min:3}).withMessage("plate must be at least 3 charecter long"),
    body("vehicle.capacity").isLength({min:1}).withMessage("capacity must be at least"),
], registerCaptain
)
router.post("/login",[
    body("email").isEmail().withMessage("Invalid email or password"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 charecter long")
], loginCaptain
)
router.get("/profile", authCaptain, getCaptainProfile
)

router.get("/logout",authCaptain, logoutCaptain)

module.exports = router;