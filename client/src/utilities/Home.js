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
      author_name: "Nestor Perez",
      rating: 5,
      text: "James Lagattuta did an outstanding job improving our company websites. His expertise in web development, SEO, and site optimization greatly enhanced our online presence. He’s professional, responsive, and delivers high-quality work. Highly recommend!",
      datePublished: "2024-03-20T04:00:00Z",
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
      "author": review.author_name,
      "datePublished": review.datePublished,
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

      {/* ✅ Static Google Reviews Section */}
      <div>
        <h2>Google Reviews</h2>
        <p><strong>Average Rating:</strong> {staticRating} ⭐ ({staticTotalRatings} reviews)</p>
        <ul>
          {staticReviews.map((review, index) => (
            <li key={index} style={{ marginBottom: "15px", listStyle: "none", padding: "10px", borderBottom: "1px solid #ddd" }}>
              <p><strong>{review.author_name}</strong> ({review.rating} ★)</p>
              <p>{review.text}</p>
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
