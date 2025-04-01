import React from 'react';
import './Pricing.css';

const Pricing = () => {
  // Helper function to navigate to /contact
  const goToContact = () => {
    window.location.href = "/contact";
  };

  return (
    <div className="pricing-page">
      <header className="pricing-hero">
        <div className="hero-overlay">
          <h1>LightningSEO.dev Pricing</h1>
          <p>
            Choose a plan that fits your digital needs—from ready-made website themes and custom designs to full web apps, ongoing website updates, comprehensive SEO, and more.
          </p>
        </div>
      </header>
      
      <section className="pricing-plans">
        {/* Website Theme Package - Always first */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/NMSX6Vdc/i-Stock-926685790.webp" />
            <img src="https://i.postimg.cc/NMSX6Vdc/i-Stock-926685790.webp" alt="Website Theme Package" />
          </picture>
          <h2>Website Theme Package</h2>
          <p className="price">$1,500</p>
          <ul className="plan-features">
            <li>Pre-designed, responsive theme</li>
            <li>Ready-to-launch website</li>
            <li>Delivered in 1 week or less</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

          {/* RankShield SEO Plan */}
          <div className="plan-card">
            <picture className="plan-image">
              <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/J0Q1rHD2/i-Stock-950615676.webp" />
              <img src="https://i.postimg.cc/J0Q1rHD2/i-Stock-950615676.webp" alt="RankShield SEO" />
            </picture>
            <h2>RankShield SEO</h2>
            <p className="price">$99/mo</p>
            <ul className="plan-features">
              <li>Ongoing site optimization to keep SEO performance strong</li>
              <li>Monthly audits to identify and fix SEO issues early</li>
              <li>Adjustments made for the latest Google algorithm updates</li>
              <li>Page speed checks and improvements where needed</li>
              <li>Includes Lightning Fast SEO</li>
            </ul>
            <button className="plan-button" onClick={goToContact}>Get Started</button>
          </div>

          {/* Update-On-Demand */}
          <div className="plan-card">
            <picture className="plan-image">
              <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/QdfHgwMy/i-Stock-2197058200.webp" />
              <img src="https://i.postimg.cc/QdfHgwMy/i-Stock-2197058200.webp" alt="Website Update On Demand" />
            </picture>
            <h2>Update-On-Demand</h2>
            <p className="price">$250/mo</p>
            <ul className="plan-features">
              <li>Content updates (text, images, links, buttons)</li>
              <li>Updates to services, locations, physician bios, or staff info</li>
              <li>New banners or section tweaks within the theme</li>
              <li>Minor style changes (fonts, colors, spacing)</li>
              <li>Includes Lightning Fast SEO</li>
            </ul>
            <button className="plan-button" onClick={goToContact}>Request Access</button>
          </div>


        {/* Custom Website Design */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/hPqzKVwp/i-Stock-1453026064.webp" />
            <img src="https://i.postimg.cc/hPqzKVwp/i-Stock-1453026064.webp" alt="Custom Website Design" />
          </picture>
          <h2>Custom Website Design</h2>
          <ul className="plan-features">
            <li>Unique, custom design</li>
            <li>Fully responsive &amp; SEO-optimized</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>
        {/* The rest of the plans sorted alphabetically */}



        

        {/* Web Application Development */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/13m8qsyF/i-Stock-2197058169.webp" />
            <img src="https://i.postimg.cc/13m8qsyF/i-Stock-2197058169.webp" alt="Web Application Development" />
          </picture>
          <h2>Web Application Development</h2>
          <ul className="plan-features">
            <li>Custom-built web application</li>
            <li>Scalable, feature-rich solution</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

        {/* Mobile App Development */}
        <div className="plan-card">
          <picture className="plan-image">
            <source media="(min-width: 768px)" srcSet="https://i.postimg.cc/PqZnfv0Q/i-Stock-2200240773.webp" />
            <img src="https://i.postimg.cc/PqZnfv0Q/i-Stock-2200240773.webp" alt="Mobile App Development" />
          </picture>
          <h2>Mobile App Development</h2>
          <ul className="plan-features">
            <li>Custom mobile apps for iOS and Android</li>
            <li>Modern, user-friendly UI and smooth UX</li>
            <li>Optimized for speed, performance, and scalability</li>
            <li>Includes Lightning Fast SEO</li>
          </ul>
          <button className="plan-button" onClick={goToContact}>Get Started</button>
        </div>

      </section>
    </div>
  );
};

export default Pricing;
