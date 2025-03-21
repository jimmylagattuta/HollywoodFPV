import { useEffect, useState } from "react";
import axios from "axios";
import "./GoogleReviews.css"; // Make sure to import the CSS file

const GoogleReviews = ({ placeId }) => {
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(null);
  const [totalRatings, setTotalRatings] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!placeId) {
      console.error("GoogleReviews Error: Missing placeId.");
      setError("Error: Missing placeId.");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://www.lightningseo.dev/google_reviews?place_id=${placeId}`);
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
      } catch (err) {
        console.error("Error fetching Google Reviews:", err.response?.data || err.message);
        setError("Failed to load Google reviews.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  // Hide component if loading, error, or no reviews available
  if (loading || error || (reviews && reviews.length === 0)) {
    return null;
  }

  return (
    <div className="google-reviews">
      <h2 className="reviews-title">Google Reviews</h2>
      {rating && (
        <p className="reviews-rating">
          <strong>Average Rating:</strong> {rating} ⭐ ({totalRatings} reviews)
        </p>
      )}
      <ul className="reviews-list">
        {reviews.map((review, index) => (
          <li key={index} className="review-card">
            <div className="review-header">
              <span>{review.author_name}</span>
              <span className="review-rating">{review.rating} ★</span>
            </div>
            <p className="review-text">{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleReviews;
