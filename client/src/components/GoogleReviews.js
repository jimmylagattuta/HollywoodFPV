import { useEffect, useState } from "react";
import axios from "axios";

const GoogleReviews = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const [totalRatings, setTotalRatings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!placeId) {
      setError("Error: Missing placeId.");
      console.error("GoogleReviews Error: Missing placeId.");
      return;
    }

    console.log(`Fetching reviews for placeId: ${placeId}`);

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/google_reviews?place_id=${placeId}`);
        console.log("Google Reviews API Response:", response.data);

        setReviews(response.data.reviews || []);
        setRating(response.data.rating);
        setTotalRatings(response.data.total_ratings);
      } catch (err) {
        setError("Failed to load Google reviews.");
        console.error("Error fetching Google Reviews:", err.response?.data || err.message);
      }
    };

    fetchReviews();
  }, [placeId]);

  return (
    <div>
      <h2>Google Reviews</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {rating && (
        <p>
          <strong>Average Rating:</strong> {rating} ⭐ ({totalRatings} reviews)
        </p>
      )}
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <li key={index} style={{ marginBottom: "15px", listStyle: "none", padding: "10px", borderBottom: "1px solid #ddd" }}>
              <p>
                <strong>{review.author_name}</strong> ({review.rating} ★)
              </p>
              <p>{review.text}</p>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default GoogleReviews;
