// components/ReviewFetcher.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const ReviewFetcher = () => {
  const [ratingValue, setRatingValue] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch review data from your Rails endpoint
    fetch('/pull_yelp_cache')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Adjust these keys based on your API's response
        setRatingValue(data.average_rating);
        setReviewCount(data.review_count);
      })
      .catch((err) => {
        console.error("Error fetching review data:", err);
        setError(err);
      });
  }, []);

  // Only inject JSON-LD when data is available
  if (error || ratingValue === null || reviewCount === null) {
    return null;
  }

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // Change to LocalBusiness if more appropriate
    "name": "LightningSEO.dev",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>
    </Helmet>
  );
};

export default ReviewFetcher;
