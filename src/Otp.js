import React, { useState } from "react";
import "./App.css";
import { ErrorToast, SuccessToast } from "./Toast.js";
import { useNavigate } from "react-router-dom";
import { ApiPost } from "./API_data.js";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");
  const handleLogin = () => {
    const data = {
      id: userid,
      signupOtp: otp,
    };

    ApiPost("signupOtpVerify", data)
      .then((res) => {
        if (res?.data?.success === true) {
          navigate("/login");
          SuccessToast("Sign up Sucessfully");
        } else {
          ErrorToast(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log("e", e);
        ErrorToast(e?.res?.data?.message);
      });

    // fetch("http://192.168.29.218:8001/user/signupOtpVerify", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data?.success === true) {
    //       navigate("/login");
    //       SuccessToast("Sign up Sucessfully");
    //     } else {
    //       ErrorToast(data?.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form">
          <h2>Send Otp</h2>
          <div className="input-group">
            <label htmlFor="otp">Add Otp:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter your otp"
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Send Otp
          </button>
        </form>
      </div>
    </>
  );
};

export default Otp;
