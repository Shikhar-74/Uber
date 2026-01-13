import React from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
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
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-2">
            <input
              required
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="type your first name"
            />
             <input
              required
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border  text-lg placeholder:text-base"
              type="text"
              placeholder="type your first Last name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="type your email"
          />

          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg">
            Login
          </button>
          <p className="text-center">
            already have account ?{" "}
            <Link to="/login" className="text-blue-600">
              login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to={"/captain-login"}
          className="bg-[#10b461] flex item-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg"
        >
          sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
