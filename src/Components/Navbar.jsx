import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="border-orange-200 p-4 font-serif text-black bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="text-2xl font-bold text-black">
          Rental Cars
        </Link>

        {/* Hamburger Menu Icon (Mobile View) */}
        <button
          className="block lg:hidden text-black"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row items-center lg:space-x-6 mt-4 lg:mt-0`}
        >
          <Link to={"/"} className="text-lg text-black hover:bg-gray-700 hover:text-white">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to={"/bookings"}
                className="text-lg text-black hover:bg-gray-700 hover:text-white"
              >
                Booking
              </Link>
              <Link
                to={"/reviews"}
                className="text-lg text-black hover:bg-gray-700 hover:text-white"
              >
                Testimonials
              </Link>
              <Link
                to={"/VehiclesRecord"}
                className="text-lg text-black hover:bg-gray-700 hover:text-white"
              >
                Vehicles Record
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 text-lg lg:text-xl mt-2 lg:mt-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/"}
                className="text-lg text-black hover:bg-gray-700 hover:text-white"
              >
                Vehicle Models
              </Link>
              <Link
                to={"/login"}
                className="text-lg text-black hover:bg-gray-700 hover:text-white"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="text-lg text-black hover:bg-gray-700 hover:text-white"
              >
                Register
              </Link>
            </>
          )}

          {isAdmin && (
            <Link
              to={"/admin"}
              className="text-lg text-black hover:bg-gray-700 hover:text-white"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
