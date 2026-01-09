const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    fullname:{
        firstName:{
            type: String,
            required: true,
            minlength: [3, "First name must be 3 character or more" ]
        },
        lastName:{
            type: String,
            minlength:[3,"Last name must be 3 char or more"]
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength:[5,"Email has atleast 5 char"]
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    soketId:{
        type: String
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET)
    return token
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10)
}

const usermodel = mongoose.model("user",userSchema)
module.exports = usermodel