import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const Register = () => {
  const Navigate = useNavigate();
  const [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    phonenumber: "",
    alamat: "",
  });
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };

  const postForm = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const result = await axios.post(
        process.env.REACT_APP_BACKEND_API_HOST + "/users/register",
        inputData
      );

      Swal.fire(
        "Success",
        "Register Success,Check your email for verification",
        "success"
      );
      Navigate("/");
    } catch (err) {
      console.log(err.response.status);
      alert("Warning", "Email Already Registered", "error");
      Navigate("/");
    }
  };

  return (
    <div className="container mx-auto max-w-screen-lg mt-24">
      <form
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={postForm}
      >
        <div className="flex flex-row">
          <div className="w-1/2 pr-4">
            <label
              htmlFor="first_name"
              className="block text-gray-700 font-bold mb-2 rounded"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              className="border border-gray-400 p-2 w-full rounded"
              placeholder="Enter your first name"
              value={inputData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 pl-4">
            <label
              htmlFor="last_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              className="border border-gray-400 p-2 w-full"
              placeholder="Enter your last name"
              value={inputData.lastname}
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-row mt-10">
          <div className="w-1/2 pr-4">
            <label className="block text-gray-700 font-bold mb-2 rounded">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-400 p-2 w-full rounded"
              placeholder="Enter your email"
              value={inputData.email}
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 pl-4">
            <label className="block text-gray-700 font-bold mb-2">
              Phone Number
            </label>
            <input
              type="number"
              id="phonenumber"
              className="border border-gray-400 p-2 w-full"
              placeholder="Enter your phonenumber"
              value={inputData.phonenumber}
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-row mt-10">
          <div className="w-full pr-4">
            <label className="block text-gray-700 font-bold mb-2 rounded">
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              className="border border-gray-400 p-2 w-full rounded h-32"
              placeholder="Enter your address"
              value={inputData.alamat}
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-row mt-10">
          <div className="w-1/2 pr-4">
            <label className="block text-gray-700 font-bold mb-2 rounded">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-400 p-2 w-full rounded"
              placeholder="Enter your password"
              value={inputData.password}
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 pl-4">
            <label className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              className="border border-gray-400 p-2 w-full"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="text-right mt-10">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
