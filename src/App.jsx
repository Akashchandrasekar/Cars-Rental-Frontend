import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Booking from './pages/Booking';
import Register from "./pages/Register";
import Navbar from './Components/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import Testimonials from './pages/Testimonials';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import BookingCarslist from './pages/BookingCarslist';
import VehicleRecords from './pages/VehiclesRecord';
const App = () => {
  return (
    <div>
      <div>
        <ToastContainer />
        </div>
      <BrowserRouter>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}setToken/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="*" element={<NotFound />}/>
        <Route path="/bookings" element={<Booking />}/>
        <Route path="/reviews" element={<Testimonials />}/>
        <Route path="/Bookinglist" element={<BookingCarslist />}/>
        <Route path="/VehiclesRecord" element={<VehicleRecords />}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
};

export default App;