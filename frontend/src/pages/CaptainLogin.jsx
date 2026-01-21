import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../contaxt/captain_context";
// import { locals } from "../../../backend/app";
const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const {captain, setCaptain} = React.useContext(CaptainDataContext)
  const navigate = useNavigate()


  const submitHandler = async(e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)
    
    if(response.status === 200){
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }


    setEmail("");
    setPassword("");
  };
  return (
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
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="type your email"
          />

          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg">
            Login
          </button>
          <p className="text-center">
            New here?{" "}
            <Link to="/captains-signup" className="text-blue-600">
              Reginster as a captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to={"/login"}
          className="bg-[#10b461] flex item-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg"
        >
          sign in as user
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
