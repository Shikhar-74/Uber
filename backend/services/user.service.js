const user_model = require("../model/user_model")



module.exports.createUser = async({firstName,lastName,email,password})=>{
    if(!firstName || !email || !password){
        throw new Error ("All fields are require")
    }
    const user = user_model.create({
        fullname:{
            firstName,
            lastName
        },
        email,
        password
    })
    return user
}