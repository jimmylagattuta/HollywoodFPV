import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { servicesData } from "../data";
import "./SingleLocation.css";

const SingleLocation = ({ office }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 769);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const servicesArray = Object.entries(servicesData).map(([key, service]) => ({
    ...service,
    id: key,
  }));

  const locationImage =
    isDesktop && office.desktopImage ? office.desktopImage : office.heroImage;

  const staticReviews = [
    {
      author_name: "Alex Alvarado",
      rating: 5,
      text: "Thanks for my web page. My impressions went from 4-30 in no time.. highly recommend!!!",
      datePublished: "2025-03-20T04:00:00Z",
    },
    {
      author_name: "Bcb Cartz",
      rating: 5,
      text: "James helped us increase our website traffic by quadruple and more! He has wonderful problem-solving skills with a great positive attitude and always respectful. Highly recommended!",
      datePublished: "2025-03-15T12:00:00Z",
    },
  ];

  const staticRating = 5.0;
  const staticTotalRatings = 2;

  const officeSnippet = {
    "@type": "LocalBusiness",
    name: office.name,
    description: office.description,
    telephone: office.phone,
    url: window.location.href,
    image: locationImage,
    email: office.email,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: staticRating,
      reviewCount: staticTotalRatings,
    },
    review: staticReviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author_name,
      },
      datePublished: review.datePublished,
      reviewBody: review.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
      },
    })),
  };

  const servicesSnippets = servicesArray.map((service) => {
    const serviceImage = isDesktop ? service.images.desktopHero : service.images.hero;
    return {
      "@type": "Service",
      name: service.title,
      description: service.shortDescription,
      url: `https://lightningseo.dev/services/${service.id}`,
      image: serviceImage,
      provider: {
        "@type": "Organization",
        name: "LightningSEO.dev",
        url: "https://lightningseo.dev",
        logo: "https://i.postimg.cc/4xcYZfvR/i-Stock-1502494966-2.webp",
      },
    };
  });

  const richSnippet = {
    "@context": "https://schema.org",
    "@graph": [officeSnippet, ...servicesSnippets],
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
            <p className="sl-location-address">Service Offered</p>
            <p className="sl-location-tagline">Websites. SEO. Results.</p>
          </div>
        </div>

        {/* Contact Info Section */}
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

        {/* Description Section */}
        <div className="sl-office-description">
          <h3>About {office.name}</h3>
          <p>{office.description}</p>
        </div>

        {/* Services List */}
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
                      style={{
                        backgroundImage: `url(${service.images.hero})`,
                      }}
                    ></div>
                    <div className="sl-service-info">
                      <h3 className="sl-service-name">{service.title}</h3>
                      <p className="sl-service-short">
                        {service.shortDescription}
                      </p>
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
