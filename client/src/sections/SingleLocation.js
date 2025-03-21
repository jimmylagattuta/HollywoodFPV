import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData } from "../data";
import "./SingleLocation.css";

const SingleLocation = ({ office }) => {
  // Determine if the screen width is 769px or wider.
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 769);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Convert servicesData into an array for mapping.
  const servicesArray = Object.entries(servicesData).map(([key, service]) => ({
    ...service,
    id: key,
  }));

  // Use desktop image if available and on desktop; else fallback to hero image.
  const locationImage =
    isDesktop && office.desktopImage ? office.desktopImage : office.heroImage;

  // Build the office snippet (LocalBusiness)
  const officeSnippet = {
    "@type": "LocalBusiness",
    "name": office.name,
    "description": office.description,
    "telephone": office.phone,
    "url": window.location.href,
    "image": locationImage,
    "email": office.email,
  };

  // Build service snippets from servicesArray
  const servicesSnippets = servicesArray.map((service) => {
    const serviceImage = isDesktop ? service.images.desktopHero : service.images.hero;
    return {
      "@type": "Service",
      "name": service.title,
      "description": service.shortDescription,
      "url": `https://lightningseo.dev/services/${service.id}`,
      "image": serviceImage,
      "provider": {
        "@type": "Organization",
        "name": "LightningSEO.dev",
        "url": "https://lightningseo.dev",
        "logo": "https://i.postimg.cc/4xcYZfvR/i-Stock-1502494966-2.webp"
      }
    };
  });

  // Combine the office and services snippets in an @graph.
  const richSnippet = {
    "@context": "https://schema.org",
    "@graph": [officeSnippet, ...servicesSnippets]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(richSnippet)}
        </script>
      </Helmet>
      <div className="sl-location-card">
        {/* Office Card Row */}
        <div className="sl-location-cardrow">
          <div
            className="sl-location-image"
            style={{ backgroundImage: `url(${locationImage})` }}
          >
            <h2 className="sl-location-name">{office.name}</h2>
          </div>
          <div className="sl-location-info">
            {/* No address: display a generic label */}
            <p className="sl-location-address">Service Offered</p>
          </div>
        </div>

        {/* Redesigned Contact Info Section */}
        <div className="sl-contact-info">
          <ul className="sl-contact-list">
            {office.phone && (
              <li className="sl-contact-item">
                <strong>Phone:&nbsp;</strong>
                <a href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}>
                  {office.phone}
                </a>
              </li>
            )}
            {office.fax && (
              <li className="sl-contact-item">
                <strong>Fax:&nbsp;</strong> {office.fax}
              </li>
            )}
            {office.email && (
              <li className="sl-contact-item">
                <a href={`mailto:${office.email}`}>Email us</a>
              </li>
            )}
          </ul>
        </div>

        {/* Office Description */}
        <div className="sl-office-description">
          <h3>About {office.name}</h3>
          <p>{office.description}</p>
        </div>

        {/* Services List Section */}
        <div
          className="sl-services-section"
          style={{
            backgroundImage: `url(${locationImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="sl-services-overlay">
            <h2 className="sl-services-title">Our Services</h2>
            <div className="sl-services-grid">
              {servicesArray
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="sl-service-card"
                  >
                    <div
                      className="sl-service-image"
                      style={{ backgroundImage: `url(${service.images.hero})` }}
                    ></div>
                    <div className="sl-service-info">
                      <h3 className="sl-service-name">{service.title}</h3>
                      <p className="sl-service-short">{service.shortDescription}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLocation;
