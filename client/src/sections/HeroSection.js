import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section">
      <picture>
        {/* Mobile Image (Default) */}
        <source
          srcSet="https://res.cloudinary.com/djtsuktwb/image/upload/v1748327504/iStock-2158667185_kpuixm.jpg"
          media="(max-width: 480px)"
          type="image/jpeg"
        />
        {/* Tablet Image */}
        <source
          srcSet="https://res.cloudinary.com/djtsuktwb/image/upload/v1748327857/iStock-1065417454_2_1_wsmbox.jpg"
          media="(max-width: 768px)"
          type="image/jpeg"
        />
        {/* Desktop Image */}
        <source
          srcSet="https://res.cloudinary.com/djtsuktwb/image/upload/v1748327636/iStock-1065417454_1_1_i8vufu.jpg"
          media="(min-width: 769px)"
          type="image/jpeg"
        />
        {/* Fallback Image */}
        <img
          src="https://res.cloudinary.com/djtsuktwb/image/upload/v1748327636/iStock-1065417454_1_1_i8vufu.jpg"
          alt="Hollywood FPV cinematic drone footage"
          width="auto"
          height="100%"
          loading="eager"
        />
      </picture>

      <div className="hero-content">
        <div className="hero-text-bg">
          <div className="hero-content-title">
            <div className="line"></div>
            <h1 className="company-name">Hollywood FPV</h1>
            <div className="line"></div>
          </div>
          <h1>
            Aerial <span className="highlight">Drone Video and Photography</span> for Events, Real Estate, Content Creators & More
          </h1>
          <p className="hero-paragraph">
            We shoot smooth, cinematic drone footage across Southern California for real estate listings, Airbnb, weddings, marketing content, inspections, and more.
          </p>
          <h1 className="subslogan">
            Footage That Shows Up.
          </h1>
          <Link to="/contact" className="cta-button">
            Book a Flight
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
