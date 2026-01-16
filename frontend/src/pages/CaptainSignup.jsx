import React, { useState } from "react";
import { Link } from "react-router-dom";

const Captainsignup = ()=>{

      const [email , setEmail]= useState('')
      const [password, setPassword] = useState('')
      const [firstName, setfirstName] = useState('')
      const [lastName, setlastName] = useState('')
      const [userData, setUserData]= useState({})
    
      const submitHandler =(e)=>{
        e.preventDefault()
        setUserData({
          fullname:{
            firstName: firstName,
            lastName: lastName
          },
          email: email,
          password: password
        })
        setEmail('')
        setPassword('')
        setfirstName('')
        setlastName('')
      }


    return(
           <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-2">
            <input
              required
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="type your first name"
              value={firstName}
              onChange={(e)=>{
                setfirstName(e.target.value)
              }}
            />
             <input
              required
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="type your first Last name"
              value={lastName}
              onChange={(e)=>{
                setlastName(e.target.value)
              }}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="type your email"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
          />

          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"

              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
          />

          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg">
            Login
          </button>
          <p className="text-center">
            already have account ?{""}
            <Link to="/login" className="text-blue-600">
              login here
            </Link>
          </p>
        </form>
      </div>
      <div>
     <p className="text-es">By procding your account dkfj dijfd aijdjf aieie akjdf ajdfj</p>
      </div>
    </div>
    )
}

export default Captainsignup