import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  // Fetch vehicles and reviews on component mount
  useEffect(() => {
    fetchVehicles();
    const storedReviews = localStorage.getItem("reviews");

    if (storedReviews) {
      setReviews(JSON.parse(storedReviews)); // Load reviews from localStorage
    } else {
      fetchAllReviews();
    }
  }, []);

  // Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "https://carsrental-project-backend.onrender.com/api/vehicles"
      );
      setVehicles(response.data);
    } catch (error) {
      setMessage("Failed to fetch vehicles. Please try again.");
    }
  };

  // Fetch all reviews
  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(
        "https://carsrental-project-backend.onrender.com/api/reviews"
      );
      setReviews(response.data);
      localStorage.setItem("reviews", JSON.stringify(response.data)); // Save reviews to localStorage
    } catch (error) {
      setMessage("Failed to fetch reviews. Please try again.");
    }
  };

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://cars-rental-project-backend.onrender.com/api/reviews",
        {
          vehicleId: selectedVehicle,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newReview = response.data;
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews); // Update state
      localStorage.setItem("reviews", JSON.stringify(updatedReviews)); // Save updated reviews to localStorage

      setMessage("Review submitted successfully!");
      setSelectedVehicle("");
      setRating(0);
      setComment("");
    } catch (error) {
      setMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Customer Reviews
        </h1>

        {/* Review Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Submit a Review
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vehicle" className="block text-gray-700 text-sm mb-2">
                Select Vehicle
              </label>
              <select
                id="vehicle"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
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
            <div>
              <label htmlFor="rating" className="block text-gray-700 text-sm mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="comment" className="block text-gray-700 text-sm mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="col-span-2 mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Message */}
        {message && (
          <div className="text-center p-4 bg-green-100 text-green-700 rounded-md mb-6">
            {message}
          </div>
        )}

        {/* Reviews List */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            All Reviews
          </h2>
          {reviews.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <p className="text-gray-800">
                    <strong>User:</strong> {review.user?.name || "Anonymous"}
                  </p>
                  <p className="text-gray-800">
                    <strong>Rating:</strong> {review.rating}/5
                  </p>
                  <p className="text-gray-800">
                    <strong>Comment:</strong> {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
