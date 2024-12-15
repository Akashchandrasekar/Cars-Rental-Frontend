import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [cars, setCars] = useState([]); // State to hold the fetched car data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const navigate = useNavigate(); // To navigate to the booking page

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        console.log("Starting API request...");
        const response = await axios.get(
          "https://carsrental-project-backend.onrender.com/api/vehicles"
        );
        console.log("Fetched Vehicles Data:", response.data);
        setCars(response.data || []); // Update state with fetched data, default to an empty array if undefined
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching vehicles:", error.message);
        setError("Failed to fetch vehicle data. Please try again later.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchVehicles();
  }, []);

  // Function to handle "Book Now" button click
  const handleBookNow = (car) => {
    // Store the selected car data in localStorage (or you can use React context/state)
    localStorage.setItem("selectedCar", JSON.stringify(car));
    navigate("/bookings");
  };

  // Conditional rendering for loading, error, and data states
  if (loading) {
    return (
      <Typography variant="h6" align="center">
        
        <br />
        <br />
        <br />
        <br />
        <h2 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-center p-4">
  Register For Seeing Our Rental Website
</h2>
<div class="flex justify-center mt-4">
  <img
    src="https://static.vecteezy.com/system/resources/previews/010/925/820/non_2x/colorful-welcome-design-template-free-vector.jpg"
    alt="welcome"
    class="w-64 h-auto md:w-80 lg:w-96 rounded-lg "
  />
</div>
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 6, px: 4, backgroundColor: "#0B1C47", color: "white" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: "Poppins" }}
      >
        Rental Cars
      </Typography>
      {cars.length > 0 ? (
        <Grid container spacing={4}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={car._id}>
              <Paper
                elevation={4}
                sx={{ p: 2, borderRadius: 2, height: "100%" }}
              >
                <Box sx={{ mb: 2 }}>
                  <img
                    src={car.image || "/default-image.jpg"} // Fallback image
                    alt={car.model || "Car Image"} // Fallback alt text
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  {car.make || "Unknown Make"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {car.model || "Unknown Model"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {car.year || "Not specified"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {car.pricePerDay
                    ? `$${car.pricePerDay}/day`
                    : "Price not available"}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <button
                    onClick={() => handleBookNow(car)} // When clicked, navigate to booking and pass car info
                    style={{
                      backgroundColor: "#1976D2",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Book Now
                  </button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" color="text.secondary">
          No cars available at the moment.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
