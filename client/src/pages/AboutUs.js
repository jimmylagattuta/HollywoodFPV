import React from "react";
import { Helmet } from "react-helmet";
import { servicesData } from "../data";
import Contact from "../pages/main/Contact";
import FooterComponent from "../sections/FooterComponent";
import "./AboutUs.css";

const AboutUs = () => {
  // Convert servicesData object into an array for mapping.
  const servicesArray = Object.entries(servicesData).map(([key, service]) => ({
    ...service,
    id: key,
  }));

  // Build the rich snippet JSON‑LD object for the About Us page.
  const richSnippet = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LightningSEO.dev",
    "url": "https://lightningseo.dev/about-us",
    "logo": "https://i.postimg.cc/4xcYZfvR/i-Stock-1502494966-2.webp",
    "description":
      "LightningSEO.dev is a full-service digital marketing agency specializing in affordable, high-performance SEO solutions, custom website development, mobile app development, and Apple Watch app development. We deliver measurable growth and a robust online presence for businesses of all sizes.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-000-000-0000",
      "contactType": "Customer Service",
      "availableLanguage": ["English"],
      "email": "jimmy.lagattuta@gmail.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Services",
      "itemListElement": servicesArray.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.shortDescription,
          "url": `https://lightningseo.dev/services/${service.id}`
        }
      }))
    }
  };

  return (
    <div className="aboutus-container">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="aboutus-hero-overlay">
          <h1 className="aboutus-hero-title">Welcome to LightningSEO.dev!</h1>
          <p className="aboutus-hero-subtitle">
            Affordable, High-Performance Digital Solutions for Your Business
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="aboutus-section">
        <h2 className="aboutus-heading">About Us</h2>
        <div className="aboutus-content">
          <div className="aboutus-card">
            <h3>Why Choose LightningSEO.dev</h3>
            <p>
              At LightningSEO.dev, we blend innovative SEO strategies with advanced digital development to help your business thrive online. Our mission is to deliver measurable results through data-driven insights and tailored solutions that drive traffic and conversions.
            </p>
          </div>
          <div className="aboutus-card">
            <h3>Our Approach</h3>
            <p>
              We begin with a comprehensive analysis of your current digital presence, followed by a custom strategy that combines on-page, technical, and local SEO with modern website and app development. Every solution is designed to maximize performance, boost search rankings, and engage your target audience.
            </p>
          </div>
          <div className="aboutus-card">
            <h3>The Difference We Make</h3>
            <p>
              Our commitment to quality, transparency, and continuous improvement sets us apart. We work closely with you to ensure that every project not only meets but exceeds your expectations—helping you achieve a strong online presence and sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="aboutus-services">
        <h2 className="aboutus-services-title">Our Services</h2>
        <div className="aboutus-services-grid">
          {servicesArray.map((service) => (
            <a
              key={service.id}
              href={`/services/${service.id}`}
              className="aboutus-service-card"
            >
              <div
                className="aboutus-service-image"
                style={{ backgroundImage: `url(${service.images.hero})` }}
              ></div>
              <h3 className="aboutus-service-title">{service.title}</h3>
              <p className="aboutus-service-desc">{service.shortDescription}</p>
            </a>
          ))}
        </div>
      </section>

      <Contact />
      <FooterComponent />
    </div>
  );
};

export default AboutUs;
