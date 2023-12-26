import React from "react";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Otp from "./Otp";
import Detail from "./Detail";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" strict element={<Login />} />
          <Route path="/home" strict element={<Home />} />
          <Route path="/signup" strict element={<SignUp />} />
          <Route path="/login" strict element={<Login />} />
          <Route path="/otp" strict element={<Otp />} />
          <Route path="/detail" strict element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
