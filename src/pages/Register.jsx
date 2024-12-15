import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";
import {useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("https://carsrental-project-backend.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });
      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="container mx-auto  py-9 bg-gray-400 font-serif">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-cyan-800 p-8 shadow">
      <h1 className="text-2xl font-bold text-fuchsia-600">Register For Seeing Our Website</h1>
       
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label htmlFor="name" className="block mb-2 font-bold">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter the Your Name"
            className="border w-full p-2 mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="email" className="block mb-2 font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter the Your Email Id"
            className="border w-full p-2 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password" className="block mb-2 font-bold">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter the Your Password"
            className="border w-full p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-red-600 p-2 mb-4 text-white font-serif rounded"
          >
            {showPassword ? "Hide" : "Show"} password
          </button>
        </p>
        <button
          type="submit"
          className="w-full hover:bg-yellow-300 bg-green-500 text-white rounded font-serif p-2 text-xl"
        >
          Register
        </button>
        <div className="bg-red-600 p-2 mb-4 text-white  font-serif rounded mt-4">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
