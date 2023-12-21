import React, { useState } from "react";
import "./App.css";
import { ErrorToast, SuccessToast } from "./Toast.js";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const data = {
      fname: username,
      lname: username,
      email: email,
      phone: phoneno,
      password: password,
    };

    fetch("http://192.168.29.218:8001/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data?.success === true) {
          navigate("/otp");
          localStorage.setItem("userid",data?.data?.userid)
          SuccessToast("Otp Send Sucessfully");
        } else {
          ErrorToast(data?.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form">
          <h2>Sign Up</h2>
          <div className="input-group">
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phoneno">Phone No:</label>
            <input
              type="phoneno"
              id="phoneno"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              placeholder="Enter your phoneno"
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Sign Up
          </button>
        </form>
        <div className="signup-word">
          <Link to="/login">
            <p style={{ cursor: "pointer" }}>Login</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
