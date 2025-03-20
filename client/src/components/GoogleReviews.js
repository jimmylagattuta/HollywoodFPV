import { useEffect, useState } from "react";
import axios from "axios";

const GoogleReviews = ({ placeId }) => {
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(null);
  const [totalRatings, setTotalRatings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!placeId) {
      console.error("GoogleReviews Error: Missing placeId.");
      setError("Error: Missing placeId.");
      setLoading(false);
      return;
    }

    console.log(`Fetching reviews for placeId: ${placeId}`);

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://www.lightningseo.dev/google_reviews?place_id=${placeId}`);
        console.log("Google Reviews API Response:", response.data);

        if (response.data.error) {
          console.error("Google Reviews API Error:", response.data.error);
          setError(response.data.error);
          setLoading(false);
          return;
        }

        const fetchedReviews = response.data.reviews || [];
        setReviews(fetchedReviews);
        setRating(response.data.rating);
        setTotalRatings(response.data.total_ratings);
        setLoading(false);

        if (fetchedReviews.length === 0) {
          console.warn("GoogleReviews: No reviews available.");
        }
      } catch (err) {
        console.error("Error fetching Google Reviews:", err.response?.data || err.message);
        setError("Failed to load Google reviews.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  // ✅ Hide the component if API fails, has errors, or no reviews exist
  if (loading || error || (reviews && reviews.length === 0)) {
    console.warn("GoogleReviews Component Hidden: No reviews or API Error.");
    return null;
  }

  return (
    <div>
      <h2>Google Reviews</h2>
      {rating && (
        <p>
          <strong>Average Rating:</strong> {rating} ⭐ ({totalRatings} reviews)
        </p>
      )}
      <ul>
        {reviews.map((review, index) => (
          <li key={index} style={{ marginBottom: "15px", listStyle: "none", padding: "10px", borderBottom: "1px solid #ddd" }}>
            <p>
              <strong>{review.author_name}</strong> ({review.rating} ★)
            </p>
            <p>{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleReviews;
