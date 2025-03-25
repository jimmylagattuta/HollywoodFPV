// App.js
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Lazy load your routes/components
const Home = lazy(() => import("./utilities/Home"));
const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/main/Contact"));
const FAQ = lazy(() => import("./pages/main/FAQ"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./sections/PrivacyPolicy"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const LocationsPage = lazy(() => import("./pages/LocationsPage")); // <-- New route
const VisitorTracker = lazy(() => import("./VisitorTracker")); // <-- Lazy load it

function App() {
  console.log(process.env.REACT_APP_RECAPTCHA);

  return (
    <div className="container">
      <Navbar />
      <main className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <VisitorTracker /> {/* Track visitors immediately */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:serviceId?" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/projects/:projectId?" element={<ProjectsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<PrivacyPolicy />} />
            <Route path="/locations/:locationId?" element={<LocationsPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
