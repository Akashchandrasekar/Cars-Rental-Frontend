import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api"; // Ensure this is configured correctly
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/login",
        { email, password }
      );

      // Save token and role to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Show success message and navigate to home
      toast.success(response.data.message);
      setError(null);
      navigate("/");
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }

    // Clear inputs
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mx-auto bg-gray-400 font-serif py-9">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto max-h-screen bg-cyan-800 p-8 shadow rounded"
      >
        <h2 className="text-2xl mb-4 font-bold text-white">Login</h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label htmlFor="email" className="block mb-2 font-bold text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            className="border w-full p-2 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </p>
        <p>
          <label htmlFor="password" className="block mb-2 font-bold text-white">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter Your Password"
            className="border w-full p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-red-100 p-2 mb-4 text-red-600 hover:bg-yellow-300 hover:text-black font-serif rounded"
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </p>
        <button
          type="button"
          onClick={() => navigate("/forgotpassword")}
          className="bg-red-100 p-2 mb-4 text-red-600 hover:bg-yellow-300 hover:text-black font-serif rounded"
        >
          Forgot Password
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded font-serif p-2 text-xl hover:bg-blue-600"
        >
          Login
        </button>
        <div className="bg-red-100 p-2 mt-4 text-red-600 font-serif rounded text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
