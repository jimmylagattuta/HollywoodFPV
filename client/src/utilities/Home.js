import React, { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import HeroSection from "../sections/HeroSection";

// Lazy-load Google Reviews
const GoogleReviews = lazy(() => import("../components/GoogleReviews"));

// Lazy-load everything else
const FooterComponent = lazy(() => import("../sections/FooterComponent"));
const AboutUsComponent = lazy(() => import("../sections/AboutUsComponent"));
const Contact = lazy(() => import("../pages/main/Contact"));
const PlaquesComponent = lazy(() => import("../sections/PlaquesComponent"));
const OurServicesComponent = lazy(() => import("../sections/OurServicesComponent"));
const HowItWorksComponent = lazy(() => import("../sections/HowItWorksComponent"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const LocationsSection = lazy(() => import("../sections/LocationsSection"));

const Home = ({ scrollToContact }) => {
  // State to trigger loading of lazy sections
  const [loadRest, setLoadRest] = useState(false);
  const [loadReviews, setLoadReviews] = useState(false);
  
  // Google Reviews States
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const [totalRatings, setTotalRatings] = useState(null);
  const [error, setError] = useState(null);

  const placeId = "ChIJDZZ912KYFS4R55uSnCS2eLM"; // Replace with actual Google Place ID

  useEffect(() => {
    // Delay loading reviews
    const timer = setTimeout(() => {
      setLoadRest(true);
      setLoadReviews(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch Google Reviews and prepare structured data
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/google_reviews?place_id=${placeId}`);
        setReviews(response.data.reviews || []);
        setRating(response.data.rating);
        setTotalRatings(response.data.total_ratings);
      } catch (err) {
        setError("Failed to load Google reviews.");
        console.error("Error fetching Google Reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  // Generate JSON-LD for Google Reviews
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LightningSEO.dev",
    "url": "https://lightningseo.dev",
    "image": "https://i.postimg.cc/QtwR2GW9/i-Stock-1502494966-1.webp",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating || "5.0",  // Default to 5.0 if no data yet
      "reviewCount": totalRatings || "10" // Default to 10 if no data yet
    },
    "review": reviews.slice(0, 3).map((review) => ({
      "@type": "Review",
      "author": review.author_name,
      "datePublished": new Date().toISOString(),
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      }
    }))
  };

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
        <title>LightningSEO.dev | Affordable Digital Marketing & Web Solutions</title>
        <meta
          name="description"
          content="LightningSEO.dev offers affordable, high-performance digital marketing solutions including expert SEO, website development, mobile app development, and Apple Watch app development to boost your online presence."
        />
      </Helmet>

      <HeroSection />

      {/* Lazy-loaded Google Reviews */}
      {loadReviews && (
        <Suspense fallback={<div>Loading Reviews...</div>}>
          <GoogleReviews placeId={placeId} />
        </Suspense>
      )}

      {loadRest && (
        <Suspense fallback={<div>Loading...</div>}>
          <AboutUsComponent />
          <Contact />
          <PlaquesComponent />
          <OurServicesComponent />
          <HowItWorksComponent />
          <ProjectsSection />
          <LocationsSection />
          <FooterComponent />
        </Suspense>
      )}
    </div>
  );
};

export default Home;