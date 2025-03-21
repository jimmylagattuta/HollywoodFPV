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
      {/* Top area with 4 columns on desktop/tablet */}
      <div className="footer-top-grid">
        {/* 1) BRAND + TAGLINE COLUMN */}
        <div className="footer-col brand-col">
          <div className="fancy-brand-row">
            <img
              src="https://i.postimg.cc/4xcYZfvR/i-Stock-1502494966-2.webp"
              alt="LightningSEO.dev Logo"
              className="fancy-brand-logo"
              height="40"
              width="40"
            />
            <div className="fancy-text-group">
              <h1 className="fancy-brand-title">LightningSEO.dev</h1>
              <h2 className="fancy-brand-subtitle">
                Affordable Digital Marketing &amp; Web Solutions
              </h2>
            </div>
          </div>
        </div>

        {/* 2) NAVIGATION COLUMN */}
        <div className="footer-col footer-section nav-col">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* 3) SERVICES COLUMN */}
        <div className="footer-col footer-section services-col">
          <h3>Our Services</h3>
          <ul>
            <li><a href="/services/on-page-seo">On-Page SEO</a></li>
            <li><a href="/services/technical-seo">Technical SEO</a></li>
            <li><a href="/services/web-development">Website Development</a></li>
            <li><a href="/services/mobile-app">Mobile App Development</a></li>
            <li><a href="/services/watch-app">Apple Watch App Development</a></li>
          </ul>
        </div>

        {/* 4) GET IN TOUCH COLUMN */}
        <div className="footer-col footer-section contact-col">
          <h3>Get In Touch</h3>
          <ul>
            <li>
              <strong>Email: </strong>
              <a href="mailto:jimmy.lagattuta@gmail.com">
                &nbsp;jimmy.lagattuta@gmail.com
              </a>
            </li>

          </ul>
          <p className="book-appointment-p">
            <a href="/contact" className="book-appointment-link">
              Contact Us
            </a>
          </p>


        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 LightningSEO.dev. All Rights Reserved.</p>
        <ul className="footer-bottom-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions">Terms &amp; Conditions</a></li>
        </ul>
        <p className="footer-credit">Website by James Lagattuta</p>
      </div>
    </footer>
  );
}

export default FooterComponent;
