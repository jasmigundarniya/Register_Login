import React, { useState } from "react";
import "./App.css";
import { ErrorToast, SuccessToast } from "./Toast.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    fetch("http://192.168.29.218:8001/user/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === true) {
          navigate("/home");
          SuccessToast("Login Sucessfully");
          localStorage.setItem("token", data?.data?.token);
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
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
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
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
        <div className="signup-word">
          <Link to="/signup">
            <p style={{ cursor: "pointer" }}>Sign Up</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
