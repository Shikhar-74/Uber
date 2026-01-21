import React, { useState } from "react";
import { Link } from "react-router-dom";
import {CaptainDataContext} from "../contaxt/captain_context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Captainsignup = ()=>{

    const navigate = useNavigate()

      const [email , setEmail]= useState('')
      const [password, setPassword] = useState('')
      const [firstName, setfirstName] = useState('')
      const [lastName, setlastName] = useState('')
      const [userData, setUserData]= useState({})

      const [vehicleColor, setVehicleColor] = useState('')
      const [vehicleType, setVehicleType] = useState('')
      const [vehicleCapacity, setvehicleCapacity] = useState('')
      const [vehiclePlate, setvehiclePlate] = useState('')


      const { captain, setCaptain } = React.useContext(CaptainDataContext);
    
      const submitHandler =async (e)=>{
        e.preventDefault()
        const captainData = {
          fullname:{
            firstName: firstName,
            lastName: lastName
          },
          email: email,
          password: password,

          vehicle:{
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType
          }

        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
        if(response.status === 201){
          const data = response.data
          setCaptain (data.captain)
          localStorage.setItem('token', data.token)
          navigate('/captain-home')
        }
        setEmail('')
        setPassword('')
        setfirstName('')
        setlastName('')
        setVehicleColor('')
        setVehicleType('')
        setvehicleCapacity('')
        setvehiclePlate('')
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

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
            required
            className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder enter vehical"
            type="text"
            placeholder="Vehicle Color"
            value={vehicleColor}
            onChange={(e)=>{
              setVehicleColor(e.target.value)
            }}
            />

               <input
            required
            className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder enter vehical"
            type="text"
            placeholder="Vehicle Plate"
            value={vehiclePlate}
            onChange={(e)=>{
              setvehiclePlate(e.target.value)
            }}
            />

          </div>


           <div className="flex gap-4 mb-7">
            <input
            required
            className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder enter vehical"
            type="text"
            placeholder="Vehicle capacity"
            value={vehicleCapacity}
            onChange={(e)=>{
              setvehicleCapacity(e.target.value)
            }}
            />

             <select     required
            className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder enter vehical"
            type="text"
            placeholder="Vehicle type"
            value={vehicleType}
            onChange={(e)=>{
              setVehicleType(e.target.value)
            }}
            >

              <option value=""disabled>Select vehicle type</option>
              <option value= "car">Car</option>
              <option value= "auto">Auto</option>
              <option value= "moto">Moto</option>


              
            </select>
            
          </div>

          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg">
            Create Captain Account 
          </button>
          <p className="text-center">
            already have account ?{""}
            <Link to="/captain-login">Captain Login</Link>
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