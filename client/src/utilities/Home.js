import React, { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../sections/HeroSection";

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

  useEffect(() => {
    // Delay loading sections
    const timer = setTimeout(() => {
      setLoadRest(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Hardcoded Google Reviews (Temporary)
  const staticReviews = [
    {
      author_name: "Alex Alvarado",
      rating: 5,
      text: "Thanks for my web page. My impressions went from 4-30 in no time.. highly recommend!!!",
      // Example date; adjust if needed
      datePublished: "2025-03-20T04:00:00Z",
    },
    {
      author_name: "Bcb Cartz",
      rating: 5,
      text: "James helped us increase our website traffic by quadruple and more! He has wonderful problem-solving skills with a great positive attitude and always respectful. Highly recommended!",
      datePublished: "2024-03-19T12:00:00Z",
    }
  ];

  const staticRating = 5.0;
  const staticTotalRatings = 2;

  // ✅ JSON-LD Schema for Google Rich Snippet
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LightningSEO.dev",
    "url": "https://lightningseo.dev",
    "image": "https://i.postimg.cc/4xcYZfvR/i-Stock-1502494966-2.webp",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": staticRating,
      "reviewCount": staticTotalRatings
    },
    "review": staticReviews.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author_name  // ✅ Now correctly formatted as a Person object
      },
      "datePublished": review.datePublished,
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "name": "Customer review"  // ✅ Helps Google understand the rating purpose
      }
    })),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "California",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "priceRange": "$$"
  };
  

  return (
    <div>
      <Helmet>
        {/* ✅ Inject Structured Data for SEO & Google Review Snippets */}
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>

        {/* ✅ High-Converting Title for Google Search */}
        <title>LightningSEO.dev | Affordable Websites That Rank Faster – Built in Under a Week</title>

        {/* ✅ Enhanced Meta Description for Google Impressions */}
        <meta
          name="description"
          content="Get a high-performance, SEO-optimized website in less than a week. LightningSEO.dev offers expert digital marketing & web development – backed by 5-star client reviews."
        />
      </Helmet>

      <HeroSection />

      {/* ✅ Static Google Reviews Section */}
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          margin: "10px 0",
          maxWidth: "100%",
          textAlign: "center",
          fontSize: "1rem" // ✅ Default mobile-friendly font size
        }}
      >
        <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>⭐ 5-Star Google Reviews</h2>
        <p style={{ fontSize: "1rem", marginBottom: "15px" }}>
          <strong>Average Rating:</strong> {staticRating} ⭐ ({staticTotalRatings} reviews)
        </p>

        <ul style={{ padding: "0", listStyle: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {staticReviews.map((review, index) => (
            <li
              key={index}
              style={{
                width: "90%", // ✅ Mobile-first width
                maxWidth: "600px", // ✅ Expand for larger screens
                marginBottom: "10px",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "left"
              }}
            >
              <p><strong>{review.author_name}</strong> ({review.rating} ★)</p>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>"{review.text}"</p>
            </li>
          ))}
        </ul>
      </div>

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
