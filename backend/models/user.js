const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {

        firstname: {
            type: String,
            minlength: [3, 'your name must be 3 charecter long'],
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        minlength: [5, 'your email should be at least 5 charecter long']
    },
    password: {
        type: String,
        required: true,
        select : false
    },
    socketId: {
        type: String,
    }
});


userSchema.methods.generateAuthToken = function(){
    const Token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    return Token;
}

userSchema.methods.comparePassword = async function(password){
    return brypt.compare(password, this.password)
}

userSchema.static.hashPassword = async function(password){
    return bcrypt.hash(password,10)
}


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;