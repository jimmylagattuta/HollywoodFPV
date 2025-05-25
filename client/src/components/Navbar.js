import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(prev => !prev);
  const goTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 769;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-container">
        <a href="/" className="navbar-logo" aria-label="Hollywood FPV Home">
          <div className="logo-flex">
            <picture>
              <source
                srcSet="https://res.cloudinary.com/djtsuktwb/image/upload/f_auto,q_auto/v1748139474/photo_eraser_5_1_osrffe.png"
                media="(min-width: 769px)"
                type="image/webp"
              />
              <img
                src="https://res.cloudinary.com/djtsuktwb/image/upload/f_auto,q_auto/v1748139260/photo_eraser_10_1_pdkfsq.png"
                alt="Hollywood FPV Logo"
                loading="eager"
                height="80"
              />
            </picture>
            <img
              className="desktop-text-logo"
              src="https://res.cloudinary.com/djtsuktwb/image/upload/f_auto,q_auto/v1748139594/photo_eraser_8_1_bezkap.png"
              alt="Hollywood FPV Title"
              height="60"
              loading="lazy"
            />
          </div>
        </a>


        {isMobile && (
          <button
            className="menu-icon"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <div className={isOpen ? 'bar change' : 'bar'} />
            <div className={isOpen ? 'bar change' : 'bar'} />
            <div className={isOpen ? 'bar change' : 'bar'} />
          </button>
        )}

        <ul className={`nav-menu ${isOpen || !isMobile ? 'active' : ''}`}>
          <li className="nav-item" onClick={() => goTo('/services')}>Services</li>
          <li className="nav-item" onClick={() => goTo('/drones')}>Drones</li>
          <li className="nav-item" onClick={() => goTo('/faq')}>FAQ</li>
          <li className="nav-item" onClick={() => goTo('/about-us')}>About Us</li>
          <li className="nav-item book-appointment" onClick={() => goTo('/book')}>Book a Flight</li>
        </ul>
      </div>
    </nav>
  );
}
