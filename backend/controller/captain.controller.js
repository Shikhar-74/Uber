const blacklistTokenModel = require('../model/blacklistToken.model');
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


module.exports.loginCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password')
    if(!captain){
        return res.status(401).json({message: 'Invalid email or password'})
    }

    const isMatch = await captain.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"})
    }

    const token = captain.generateAuthToken()
    res.cookie('token',token);
    res.status(200).json({token, captain})
}


module.exports.getCaptainPforile = async(req,res,next)=>{
    res.status(200).json({captain: req.captain});
}


module.exports.logOutCaptain = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    await blacklistTokenModel.create({token});
    res.clearCookie("token")
    res.status(200).json({message: 'Logout Successfully'})
}