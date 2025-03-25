// src/sections/LocationsSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { serviceOfferedData } from "../data";
import "./LocationsSection.css";

function LocationsSection({ showButton = true }) {
  let locations = Object.entries(serviceOfferedData).map(([key, location]) => ({
    ...location,
    id: key,
  }));

  locations.sort((a, b) => a.name.localeCompare(b.name));

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [expanded, setExpanded] = useState(false);
  const displayedLocations = expanded ? locations : locations.slice(0, 10);

  const openMap = (address, e) => {
    e.stopPropagation();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address.replace(/ /g, "+")}`,
      "_blank"
    );
  };

  const callPhone = (phone, e) => {
    e.stopPropagation();
    window.location.href = `tel:${phone.replace(/[^0-9]/g, "")}`;
  };

  const getBackgroundImage = (location) => {
    return isDesktop && location.desktopImage
      ? location.desktopImage
      : location.heroImage;
  };

  return (
    <section className="locations-section">
      <div className="hero-content-title">
        <div className="line-locations"></div>
        <h1 className="company-name-locations">OUR LOCATIONS</h1>
        <div className="line-locations"></div>
      </div>

      <div className="locations-grid">
        {displayedLocations.map((location, index) => (
          <Link
            key={location.id}
            to={`/locations/${location.id}`}
            className="location-card-link"
          >
            <div className={`location-card ${index % 2 !== 0 ? "reverse" : ""}`}>
              <div
                className="location-image"
                style={{ backgroundImage: `url(${getBackgroundImage(location)})` }}
              ></div>
              <div className="location-info">
                <h2 className="location-city">{location.name}</h2>
                <p className="location-address">
                  {location.address && location.address !== "Service Area" ? (
                    <span
                      onClick={(e) => openMap(location.address, e)}
                      className="map-link"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src="https://i.postimg.cc/HLxtkzZm/map-pin-1-1.webp"
                        alt="Map icon"
                        className="map-icon"
                        height="16"
                        width="16"
                      />
                      {location.address}
                    </span>
                  ) : (
                    "Service Area"
                  )}
                </p>
                {location.phone && (
                  <p className="location-address">
                    <strong>Phone:</strong>
                    <span
                      onClick={(e) => callPhone(location.phone, e)}
                      className="phone-link"
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                    >
                      {location.phone}
                    </span>
                  </p>
                )}

                {location.email && (
                  <p className="location-address">
                    <a
                      href={`mailto:${location.email}`}
                      className="email-link"
                      style={{ marginLeft: "5px", color: "#333", textDecoration: "underline" }}
                    >
                      Email Us
                    </a>
                  </p>
                )}

              </div>
            </div>
          </Link>
        ))}
      </div>

      {locations.length > 8 && (
        <div className="button-row-container">
          <button
            className="location-section-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show All Locations"}
          </button>
          <Link to="/locations" className="location-section-button">
            Go to Full Locations Page
          </Link>
        </div>
      )}

      {showButton && (
        <div className="cta-container" style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/contact" className="cta-button">
            Get a Free SEO Audit
          </Link>
        </div>
      )}
    </section>
  );
}

export default LocationsSection;
