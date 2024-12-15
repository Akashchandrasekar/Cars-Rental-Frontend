import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch vehicles and bookings from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesResponse = await axios.get(
          "https://carsrental-project-backend.onrender.com/api/vehicles"
        );
        setVehicles(vehiclesResponse.data);

        const bookingsResponse = await axios.get(
          "https://carsrental-project-backend.onrender.com/api/bookings"
        );
        setBookings(bookingsResponse.data);
      } catch (error) {
        setMessage("Failed to fetch data. Please try again.");
      }
    };
    fetchData();
  }, []);

  // Handle form submission
  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://carsrental-project-backend.onrender.com/api/bookings",
        {
          vehicle: selectedVehicle,
          startDate,
          endDate,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if authentication is required
          },
        }
      );

      // Update booking list after successful booking
      setBookings([...bookings, response.data.booking]);
      setMessage("Booking confirmed successfully!");
    } catch (error) {
      setMessage("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Vehicle Booking Page
        </h1>

        {/* Form */}
        <form onSubmit={handleBooking} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vehicle Selection */}
            <div>
              <label htmlFor="vehicle" className="block text-gray-700">
                Select Vehicle
              </label>
              <select
                id="vehicle"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Choose a vehicle
                </option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.make} {vehicle.model}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="endDate" className="block text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Total Price */}
            <div>
              <label htmlFor="totalPrice" className="block text-gray-700">
                Total Price
              </label>
              <input
                type="number"
                id="totalPrice"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Confirm Booking
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className="text-center p-4 bg-green-100 text-green-700 rounded-md mb-6">
            {message}
          </div>
        )}

        {/* Bookings List */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Existing Bookings
          </h2>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <p className="text-gray-800">
                    <strong>Vehicle:</strong> {booking.vehicle.make}{" "}
                    {booking.vehicle.model}
                  </p>
                  <p className="text-gray-800">
                    <strong>Start Date:</strong>{" "}
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-800">
                    <strong>End Date:</strong>{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-800">
                    <strong>Total Price:</strong> ${booking.totalPrice}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No bookings available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
