import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Home = ({ onSearch }) => {
  const [userData, setUserData] = useState(null);
  const [uData, setUData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [del, setDel] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const data = {
      search: searchTerm,
    };
    try {
      const response = await axios.post(
        "http://192.168.29.218:8001/user/get_allUser",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("Network response was not ok");
      }
      setUserData(response?.data?.data?.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, searchTerm]);

  const handleUpdate = async () => {
    const data = {
      userid: uData?._id,
      fname: uData?.fname,
      lname: uData?.lname,
      email: uData?.email,
      phone: uData?.phone,
    };
    try {
      const response = await axios.post(
        "http://192.168.29.218:8001/user/updateUser",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.success === true) {
        closeModal();
        fetchData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = async () => {
    const data = {
      userid: del?._id,
    };
    try {
      const response = await axios.post(
        "http://192.168.29.218:8001/user/deleteUser",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.success === true) {
        closeModal1();
        fetchData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openModal = (val) => {
    setUData(val);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal1 = (val) => {
    setDel(val);
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUData({ ...uData, [name]: value });
  };

  return (
    <div style={{ margin: "0 100px" }}>
      <h1 style={{ padding: "0 20px" }}>User Details</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((val, index) => (
              <tr key={index}>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate("/detail", {
                      state: {
                        id: val?._id,
                      },
                    })
                  }
                >
                  {val?.fname}
                </td>
                <td>{val?.lname}</td>
                <td>{val?.email}</td>
                <td>{val?.phone}</td>
                <td style={{ cursor: "pointer" }}>
                  <span onClick={() => openModal(val)}>
                    <RiEdit2Fill />
                  </span>
                  <span onClick={() => openModal1(val)}>
                    <MdDeleteForever />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="umodal">
              <div style={{ fontSize: "30px", marginBottom: "20px" }}>
                Update Data
              </div>
              <div
                onClick={closeModal}
                style={{ cursor: "pointer", fontSize: "20px" }}
              >
                <IoMdClose />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">First Name:</label>
              <input
                type="text"
                name="fname"
                value={uData?.fname}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                name="lname"
                value={uData?.lname}
                onChange={handleChange}
                placeholder="Enter your lname"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                value={uData?.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneno">Phone No:</label>
              <input
                type="phoneno"
                name="phone"
                value={uData?.phone}
                onChange={handleChange}
                placeholder="Enter your phoneno"
              />
            </div>
            <button onClick={handleUpdate}>Submit</button>
          </div>
        </div>
      )}

      {isModalOpen1 && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="umodal">
              <div style={{ fontSize: "30px", marginBottom: "20px" }}>
                Are you sure you want to delete this user ?
              </div>
              <div
                onClick={closeModal1}
                style={{ cursor: "pointer", fontSize: "20px" }}
              >
                <IoMdClose />
              </div>
            </div>

            <button
              style={{ marginRight: "20px" }}
              onClick={() => handleDelete()}
            >
              Yes
            </button>
            <button onClick={closeModal1}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
