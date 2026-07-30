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

const blacklistTokenModel = mongoose.model("blacklistToken", blasklistTokenSchema);
module.exports = blacklistTokenModel;