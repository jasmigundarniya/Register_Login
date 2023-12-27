import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ApiPost } from "./API_data";

const Detail = () => {
  const [data, setData] = useState();

  const location = useLocation();

  const token = localStorage.getItem("token");

  const detailData = async () => {
    const data = {
      userid: location?.state?.id,
    };

    ApiPost("getSingUser", data)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((e) => {
        console.log("e", e);
      });

    // try {
    //   const response = await axios.post(
    //     "http://192.168.29.218:8001/user/getSingUser ",
    //     data,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   setData(response?.data?.data);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  useEffect(() => {
    detailData();
  }, [token]);
  return (
    <>
      <div className="product-detail-container">
        <div className="product-info">
          <h2>{data?.fname}</h2>
          <p>Name: {data?.lname}</p>
          <p>Email: {data?.email}</p>
          <p>Phone Number: {data?.phone}</p>
        </div>
      </div>
    </>
  );
};

export default Detail;
