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
const LocationsSection = lazy(() => import("../sections/LocationsSection"));

const Home = ({ scrollToContact }) => {
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadRest(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Hollywood FPV | Cinematic Drone Videography in LA & Orange County</title>
        <meta
          name="description"
          content="Hollywood FPV provides high-end drone cinematography for real estate, events, social media, and more across Los Angeles and Orange County."
        />
        <meta property="og:title" content="Hollywood FPV | Drone Cinematography Experts" />
        <meta
          property="og:description"
          content="Book professional drone videography for weddings, real estate, parties, and commercials in Southern California. FAA certified, cinematic quality."
        />
        <meta property="og:url" content="https://hollywood-fpv-e9adcc4a24d9.herokuapp.com/" />
        <meta
          property="og:image"
          content="https://i.postimg.cc/4xcYZfvR/i-Stock-1502494966-2.webp"
        />
      </Helmet>

      <HeroSection />

      {loadRest && (
        <Suspense fallback={<div>Loading...</div>}>
          {/* <AboutUsComponent /> */}
          <Contact />
          {/* <PlaquesComponent /> */}
          {/* <OurServicesComponent /> */}
          {/* <HowItWorksComponent /> */}
          {/* <LocationsSection /> */}
          {/* <FooterComponent /> */}
        </Suspense>
      )}
    </div>
  );
};

export default Home;
