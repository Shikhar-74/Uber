const usermodel = require("../model/user_model")
const userService = require("../services/user.service")
const {validationResult} = require("express-validator")


module.exports.registerUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {fullname, email, password}=req.body
    const hashedPassword = await usermodel.hashPassword(password)
    const user = await userService.createUser({
        firstName: fullname.firstName,
        lastName: fullname.lastName,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({token,user})
}

module.exports.loginUser = async(req,res,next)=>{
     const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password}= req.body
    const user = await usermodel.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({message:"invalid email or password"})
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({message:"invalid email or password"})
    }

    const token = user.generateAuthToken()
    return res.status(200).json({token, user})
}