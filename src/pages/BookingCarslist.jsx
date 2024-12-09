import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch cars from the backend API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://cars-rental-project-backend.onrender.com/api/vehicles');
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load cars, please try again.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleBooking = (vehicleId) => {
    navigate(`https://cars-rental-project-backend.onrender.com/api/booking/${vehicleId}`); // Navigate to the booking form for the selected car
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-2xl text-gray-500">Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 min-h-screen py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Cars for Booking</h1>

        {error && <div className="p-4 text-center text-red-700 bg-red-100 rounded-md mb-6">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.length === 0 ? (
            <div className="text-center col-span-full text-gray-500">No cars available at the moment.</div>
          ) : (
            cars.map((car) => (
              <div
                key={car._id}
                className="bg-gradient-to-r from-blue-100 to-blue-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={car.image || 'https://via.placeholder.com/300x200?text=Car+Image'} 
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{car.make} {car.model} ({car.year})</h3>
                <p className="text-gray-700 my-2">{car.description || 'No description available.'}</p>
                <p className="text-gray-600 font-medium">Price per day: ${car.pricePerDay}</p>
                <button
                  onClick={() => handleBooking(car._id)}
                  className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsList;
