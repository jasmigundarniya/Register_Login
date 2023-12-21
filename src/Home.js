import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState(null);
  console.log('userData :>> ', userData);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.29.218:8001/user/get_allUser", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("response :>> ", response);

        if (!response.data) {
          throw new Error("Network response was not ok");
        }

        setUserData(response?.data?.data?.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1 style={{padding: '0 20px'}}>User Details</h1>
      <div className="table-container">
      <table>
        <thead>
          <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((val, index) => (
            <tr key={index}>
                <td>{val?.fname}</td>
                <td>{val?.lname}</td>
                <td>{val?.email}</td>
                <td>{val?.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Home;
