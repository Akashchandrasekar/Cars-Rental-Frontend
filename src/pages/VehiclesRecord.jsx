import React, { useEffect, useState } from "react";
import axios from "axios";

const VehicleRecords = () => {
  const [vehicles, setVehicles] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [rentalReport, setRentalReport] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [message, setMessage] = useState("");

  // Fetch vehicles from the backend or localStorage
  useEffect(() => {
    const storedVehicles = localStorage.getItem("vehicles");
    if (storedVehicles) {
      setVehicles(JSON.parse(storedVehicles));
    } else {
      fetchVehicles();
    }
  }, []);

  // Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "https://carsrental-project-backend.onrender.com/api/vehicles"
      );
      setVehicles(response.data);
      localStorage.setItem("vehicles", JSON.stringify(response.data)); // Save to localStorage
    } catch (error) {
      setMessage("Failed to fetch vehicle records. Please try again.");
    }
  };

  // Fetch rental history for a specific vehicle
  const fetchRentalHistory = async (vehicleId) => {
    try {
      const response = await axios.get(
        `https://carsrental-project-backend.onrender.com/api/bookings/rental-history/${vehicleId}`
      );
      setRentalHistory(response.data.rentalHistory);
      setMessage("");
    } catch (error) {
      setMessage("Failed to fetch rental history. Please try again.");
    }
  };

  // Fetch rental report for a specific vehicle
  const fetchRentalReport = async (vehicleId) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
  
      if (!token) {
        setError("You need to log in to view this information.");
        return;
      }
  
      // Send the token in the Authorization header
      const response = await axios.get(
        `https://carsrental-project-backend.onrender.com/api/bookings/rental-report/${vehicleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Rental Report:", response.data); // Log the rental report data
    } catch (error) {
      setError("Error fetching rental report");
      console.error(error);
    }
  };

  // Handle vehicle selection
  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    fetchRentalHistory(vehicleId);
    fetchRentalReport(vehicleId);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Vehicle Records
        </h1>

        {/* Vehicle List */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Vehicles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className={`p-4 bg-gradient-to-r ${
                  selectedVehicleId === vehicle._id
                    ? "from-blue-500 to-green-500"
                    : "from-gray-100 to-gray-300"
                } rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
                onClick={() => handleVehicleSelect(vehicle._id)}
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-gray-700">
                  <strong>License Plate:</strong> {vehicle.licensePlate}
                </p>
                <p className="text-gray-700">
                  <strong>Rental Price:</strong> ${vehicle.rentalPrice}/day
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Rental History */}
        {selectedVehicleId && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Rental History
            </h2>
            {rentalHistory.length > 0 ? (
              <div className="overflow-auto max-h-96">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="px-4 py-2 border">User</th>
                      <th className="px-4 py-2 border">Start Date</th>
                      <th className="px-4 py-2 border">End Date</th>
                      <th className="px-4 py-2 border">Duration (days)</th>
                      <th className="px-4 py-2 border">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentalHistory.map((history) => (
                      <tr key={history.bookingId} className="text-gray-700">
                        <td className="px-4 py-2 border">{history.user}</td>
                        <td className="px-4 py-2 border">
                          {new Date(history.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 border">
                          {new Date(history.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 border">{history.duration}</td>
                        <td className="px-4 py-2 border">
                          ${history.totalPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No rental history available.</p>
            )}
          </div>
        )}

        {/* Rental Report */}
        {selectedVehicleId && rentalReport && (
          <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Rental Report
            </h2>
            <p className="text-gray-800">
              <strong>Total Rentals:</strong> {rentalReport.totalRentals}
            </p>
            <p className="text-gray-800">
              <strong>Total Earnings:</strong> ${rentalReport.totalEarnings}
            </p>
            <p className="text-gray-800">
              <strong>Total Rental Duration:</strong>{" "}
              {rentalReport.totalDurationInDays} days
            </p>
          </div>
        )}

        {/* Message */}
        {message && (
          <div className="text-center p-4 bg-red-100 text-red-700 rounded-md">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleRecords;
