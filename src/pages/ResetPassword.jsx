import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();  // Getting the id and token from URL params

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `https://carsrental-project-backend.onrender.com/api/auth/reset-password/${token}`,
        {
          password,
        }
      );
      setMessage("Password reset successfully!");
      setError("");
      setPassword("");
      setConfirmPassword("");

      // Redirect the user after successful reset (e.g., to login page)
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Reset Your Password
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

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
