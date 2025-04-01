import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section">
      <picture>
        {/* Mobile Image (Default) */}
        <source
          srcSet="https://i.postimg.cc/c4RftRhP/i-Stock-1094589946-1-1-1.webp"
          media="(max-width: 480px)"
          type="image/webp"
        />
        {/* Tablet Image */}
        <source
          srcSet="https://i.postimg.cc/7Zq035Qh/i-Stock-1094589946-1-1.webp"
          media="(max-width: 768px)"
          type="image/webp"
        />
        {/* Desktop Image */}
        <source
          srcSet="https://i.postimg.cc/wxJmnXC3/i-Stock-1094589946-2-2.webp"
          media="(min-width: 769px)"
          type="image/webp"
        />
        {/* Fallback Image */}
        <img
          src="https://i.postimg.cc/wxJmnXC3/i-Stock-1094589946-2-2.webp"
          alt="Lightning-fast web experiences"
          width="auto"
          height="100%"
          loading="eager"
        />
      </picture>

      <div className="hero-content">
        <div className="hero-text-bg">
          <div className="hero-content-title">
            <div className="line"></div>
            <h1 className="company-name">LightningSEO.dev</h1>
            <div className="line"></div>
          </div>
          <h1>
            Don’t Blink—Experience <span className="highlight">Affordable, Lightning-Fast</span> Websites
          </h1>
          <p className="hero-paragraph">
            Our websites load in a flash, delivering seamless, engaging experiences that outpace the rest. Our speed earns Google’s applause—ensuring your site takes center stage.
          </p>
          <h1 className="subslogan">
            Ready to upgrade your online presence?
          </h1>
          <Link to="/contact" className="cta-button">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
