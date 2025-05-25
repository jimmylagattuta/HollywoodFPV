import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSnapchat,
  faTiktok,
  faYoutube,
  faPinterest,
  faThreads,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import "./FooterComponent.css";

function FooterComponent() {
  return (
    <footer className="footer-container">
      <div className="footer-top-grid">
        {/* 1) BRAND + TAGLINE */}
        <div className="footer-col brand-col">
          <div className="fancy-brand-row">
            <img
              src="https://i.postimg.cc/xCBzCbvD/Chat-GPT-Image-May-21-2025-04-26-56-PM-1-7.webp"
              alt="Hollywood FPV Logo"
              className="fancy-brand-logo"
              height="120"
              width="80"
            />
            <div className="fancy-text-group">
              <h1 className="fancy-brand-title">Hollywood FPV</h1>
              <h2 className="fancy-brand-subtitle">
                Cinematic Drone Videography Across SoCal
              </h2>
            </div>
          </div>
        </div>

        {/* 2) NAVIGATION */}
        <div className="footer-col footer-section nav-col">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Drone Services</a></li>
            <li><a href="/locations">Service Areas</a></li>
            <li><a href="/contact">Book a Flight</a></li>
          </ul>
        </div>

        {/* 3) DRONE SERVICES */}
        <div className="footer-col footer-section services-col">
          <h3>Drone Services</h3>
          <ul>
            <li><a href="/services/graduation-drone-video">Graduation Videography</a></li>
            <li><a href="/services/wedding-drone-coverage">Wedding Drone Coverage</a></li>
            <li><a href="/services/airbnb-drone-promos">Airbnb Drone Promos</a></li>
            <li><a href="/services/commercial-drone-shoots">Commercial Shoots</a></li>
            <li><a href="/services/property-drone-tours">Real Estate Tours</a></li>
            <li><a href="/services/event-drone-coverage">Event Coverage</a></li>
            <li><a href="/services/social-media-drone">Social Media Content</a></li>
            <li><a href="/services/film-drone-cinematography">Cinematic Film Drone Work</a></li>
            <li><a href="/services/construction-progress-monitoring">Construction Monitoring</a></li>
            <li><a href="/services/agriculture-drone-services">Agricultural Drones</a></li>
            <li><a href="/services/drone-mapping-surveying">Mapping & Surveying</a></li>
            <li><a href="/services/roof-infrastructure-inspections">Infrastructure Inspections</a></li>
          </ul>
        </div>

        {/* 4) CONTACT */}
        <div className="footer-col footer-section contact-col">
          <h3>Get In Touch</h3>
          <ul>
            <li>
              <strong>Email:</strong>
              <a href="mailto:fpvhollywood@gmail.com">&nbsp;fpvhollywood@gmail.com</a>
            </li>
            <li>
              <strong>Phone:</strong>
              <a href="tel:8059980074">&nbsp;(805) 998-0074</a>
            </li>
          </ul>
          <p className="book-appointment-p">
            <a href="/contact" className="book-appointment-link">
              Book a Flight
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 Hollywood FPV. All Rights Reserved.</p>
        <ul className="footer-bottom-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions">Terms &amp; Conditions</a></li>
        </ul>
        <p className="footer-credit">Site by James Lagattuta</p>
      </div>
    </footer>
  );
}

export default FooterComponent;
