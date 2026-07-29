const captainModel = require("../models/captainModel");

module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, vehicleType, plate, capacity
}) => {
    if (!firstname || !lastname || !email || !password ||
        !color || !vehicleType || !plate || !capacity) {
        throw new Error("All filds are required");
    }
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}