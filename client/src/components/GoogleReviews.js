import { useEffect, useState } from "react";
import axios from "axios";

const GoogleReviews = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const [totalRatings, setTotalRatings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/google_reviews?place_id=${placeId}`);
        // Assuming the API returns an object with keys: rating, total_ratings, reviews
        setReviews(response.data.reviews || []);
        setRating(response.data.rating);
        setTotalRatings(response.data.total_ratings);
      } catch (err) {
        setError("Failed to load Google reviews.");
        console.error("Error fetching Google Reviews:", err);
      }
    };

    fetchReviews();
  }, [placeId]);

  // Hide the component if there's an error or if there are no reviews and no rating
  if (error || (reviews.length === 0 && !rating)) {
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
          <li key={index} style={{ marginBottom: "15px", listStyle: "none" }}>
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
