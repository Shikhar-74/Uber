const captainModel = require("../model/captain.model");


module.exports.createCaptain = async ({
    firstName, lastName, email, password, color, plate, capacity, vehicleType
}) =>{
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("all fields are require");
    }

    const captain = captainModel.create({
        fullname:{
            firstName,
            lastName
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
    return captain
}