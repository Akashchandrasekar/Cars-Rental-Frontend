import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className=" border-orange-200 p-4  font-serif  text-black"  >
      <div className="container mx-auto flex   justify-between">
        <Link to={"/"} className="text-2xl font-bold text-black" >
          Rental Cars
        </Link>
        <div>
          <Link to={"/"} className="mr-6  text-lg t text-black hover:bg-gray-700 hover:text-white">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={"/bookings"} className="mr-6 text-lg hover:bg-gray-700 hover:text-white">
                Booking
              </Link>
              <Link to={"/reviews"} className="mr-6  text-lg text-black hover:bg-gray-700 hover:text-white" >
              Testimonials
              </Link>
              <Link to={"/VehiclesRecord"} className="mr-6 text-lg text-black hover:bg-gray-700 hover:text-white" style={{fontFamily:"Poppins!important"}} >
                Vehicles Record
              </Link>
              <button onClick={handleLogout} className="text-red-500 text-xl">
                Logout
              </button>
            </>
          ) : (
            <>
             <Link to={"/"} className="mr-6 text-lg text-black hover:bg-gray-700 hover:text-white" >
              Vehicle Models
              </Link>
               
              <Link to={"/login"} className="mr-6 text-lg text-black hover:bg-gray-700 hover:text-white" >
                Login
              </Link>
              <Link to={"/register"} className="hover:bg-gray-700 text-lg text-black hover:text-white">Register</Link>
              
            </>
          )}

          {isAdmin && (
            <Link to={"/admin"} className="ml-4 hover:bg-gray-700 hover:text-white">
              Admin Panel
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;