// src/sections/LocationsSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { serviceOfferedData } from "../data";
import "./LocationsSection.css";

function LocationsSection({ showButton = true }) {
  // Convert serviceOfferedData (an object) to an array of locations with keys.
  let locations = Object.entries(serviceOfferedData).map(([key, location]) => ({
    ...location,
    id: key,
  }));

  // Alphabetize locations by name.
  locations.sort((a, b) => a.name.localeCompare(b.name));

  // Determine if the screen width is 769 or greater.
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle expand/collapse state.
  const [expanded, setExpanded] = useState(false);

  // Only show the first 10 locations by default.
  const displayedLocations = expanded ? locations : locations.slice(0, 10);

  // Handler to open the address in Google Maps.
  const openMap = (address, e) => {
    e.stopPropagation();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address.replace(/ /g, "+")}`,
      "_blank"
    );
  };

  // Handler for calling the phone number.
  const callPhone = (phone, e) => {
    e.stopPropagation();
    window.location.href = `tel:${phone.replace(/[^0-9]/g, "")}`;
  };

  // Helper to determine the background image based on screen width and available data.
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
              </div>
            </div>
          </Link>
        ))}
      </div>
      {locations.length > 10 && (
        <div className="button-container" style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            className="location-section-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show All Locations"}
          </button>
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
