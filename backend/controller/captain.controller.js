const captainModel = require('../model/captain.model')
const captainService = require('../services/captain.service')
const {validationResult} = require("express-validator")



module.exports.registerCaptain = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname, email, password, vehicle} = req.body;
    const isCaptionAlreadyExist = await captainModel.findOne({email})
    if(isCaptionAlreadyExist){
        return res.status(400).json({message: 'captain already exist'})
    }


    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstName: fullname.firstName,
        lastName: fullname.lastName,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token = captain.generateAuthToken()
    res.status(201).json({token, captain})


}