const mongoose= require("mongoose");
const { validate } = require("./user");

const blasklistTokenSchema = mongoose.Schema({
    token:{
        type: String,
        require: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expaires: 86400
    }
})

module.exports = mongoose.model("blacklistToken", blasklistTokenSchema);