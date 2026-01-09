// const userModel = require("../model/user_model")
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// module.exports.authUser = async(req, res, next)=>{
//     const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ]

//     if(!token){
//         return res.status(401).json({message: "unauthorized"})
//     }
//     const isBlackListed = await userModel.findOne({token: token})
//     if(isBlackListed){
//         return res.status(401).json({message: "Unauthorized"})
//     }
//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id)
//         req.user = user
//         return next()
//     }catch(err){
//         return res.status(401).json({message:"unauthorized"})
//     }
// }



const jwt = require("jsonwebtoken");
const userModel = require("../model/user_model");
const blacklistTokenModel = require("../model/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
    try {
        let token;

        // get token safely
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // ✅ blacklist check (MAIN FIX)
        const blacklisted = await blacklistTokenModel.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        req.token = token; // 🔥 store token for logout
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
