const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "firstname must be minimum 3 charecter long"]
        },
        lastname: {
            type: String,
            minlength: [3, "lastname must be minimum 3 charecter long"]
        }
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "password must be at least 6 charecter long"]
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "color name should have at least 3 charecter"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "color name should have at least 3 charecter"]
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, "capacity must be at least one"]
        },
        vehicleType: {
            type: String,
            enum: ["bike", "auto", "car"],
            required: true
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h',
            algorithm: 'HS256'
        }
    );
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;