const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
const usercontroller = require("../controller/user.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstName').isLength({min:3}).withMessage("first name must be at least 3 char"),
    body('password').isLength({min:6}).withMessage("password must be atleast 6 char long")
],usercontroller.registerUser)


router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("password must be atleast 6 char")
],usercontroller.loginUser)


router.get('/profile',authMiddleware.authUser, usercontroller.getUserProfile)
router.get('/logout', authMiddleware.authUser, usercontroller.logoutUser)

module.exports = router