import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Captainlogin from "./pages/CaptainLogin";
import Captainsignup from "./pages/CaptainSignup";
import Home from "./pages/home";
import UserProtect from "./pages/userProtected";
import { UserLogout } from "./pages/userLogout";
import CaptainHome from "./pages/captainHome";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captains-signup" element={<Captainsignup />} />
        <Route
          path="/home"
          element={
            <UserProtect>
              <Home />
            </UserProtect>
          }
        />

        <Route
          path="/user/logout"
          element={
            <UserProtect>
              <UserLogout />
            </UserProtect>
          }
        />

        <Route
          path="/captain-home"
          element={
            <captainProctedWrapper>
              <CaptainHome />
            </captainProctedWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
