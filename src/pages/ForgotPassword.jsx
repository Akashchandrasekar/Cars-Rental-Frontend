import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        `https://cars-rental-project-backend.onrender.com/api/auth/forgot-password`,  // Update with your API URL
        { email }
      );

      setMessage(response.data.message);
      setError("");

      // Redirect to login page after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Failed to send the reset password email. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Forgot Your Password?
        </h2>

        {/* Message */}
        {message && (
          <div className="text-center p-4 bg-green-100 text-green-700 rounded-md mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="text-center p-4 bg-red-100 text-red-700 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Remember your password? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
