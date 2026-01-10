const express = require('express')
const router = express.Router()
const {body}= require("express-validator")
const captainController = require('../controller/captain.controller')
const authmiddleware = require('../middleware/auth.middleware')
router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstName').isLength({min: 3}).withMessage('first name must be at leat 3 char'),
    body('password').isLength({min: 6}).withMessage("password must be at least 6 char"),
    body('vehicle.color').isLength({min: 3}).withMessage('color must be at leat 3 char'),
    body("vehicle.plate").isLength({min: 3}).withMessage('plate must be at leat 3 char'),
    body("vehicle.capacity").isInt({min: 1}).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalid"),
],captainController.registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage("password must be at least 6 char"),
],captainController.loginCaptain)

router.get('/profile', authmiddleware.authCaptain, captainController.getCaptainPforile)

router.get('/logout', authmiddleware.authCaptain, captainController.logOutCaptain)

module.exports = router