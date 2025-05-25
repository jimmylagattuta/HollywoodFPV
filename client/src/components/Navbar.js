import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const navigate                = useNavigate();

  // spinning + X state
  const [isSpinning, setIsSpinning] = useState(false);
  const [menuStage, setMenuStage]   = useState('hamburger'); // 'hamburger' | 'spinning' | 'propeller'
  const [hasX, setHasX]             = useState(false);
const toggleMenu = () => {
  if (isSpinning) return;

  const opening = !isOpen;
  setIsOpen(opening); // 👈 shows/hides mobile menu immediately

  setIsSpinning(true);
  setMenuStage('spinning');

  setTimeout(() => {
    setMenuStage(opening ? 'propeller' : 'hamburger');
    setIsSpinning(false);
    setHasX(opening);
  }, 1500);
};


  const goTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // handle resize
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 769;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // spin every 5s when closed (mobile only)
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      const el = document.querySelector('.menu-icon');
      if (el && !isOpen) {
        el.classList.add('spin');
        setTimeout(() => el.classList.remove('spin'), 1200);
      }
    }, 5000);
    return () => clearInterval(id);
  }, [isMobile, isOpen]);

  // build your icon’s classes—no grow-x anywhere
  const menuIconClasses = [
    'menu-icon',
    isSpinning ? 'spin' : '',
    hasX       ? 'has-x' : ''
  ].filter(Boolean).join(' ');

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
          <>
            {menuStage === 'hamburger' ? (
              <button className="new-menu-icon" onClick={toggleMenu} aria-label="Open menu">
                <div className="new-bar" />
                <div className="new-bar" />
                <div className="new-bar" />
              </button>
            ) : (
              <button
                className={menuIconClasses}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <div className={hasX && !isSpinning ? 'bar change' : 'bar'} />
                <div className={hasX && !isSpinning ? 'bar change' : 'bar'} />
                <div className={hasX && !isSpinning ? 'bar change' : 'bar'} />
                <div className={hasX && !isSpinning ? 'bar change' : 'bar'} />
              </button>
            )}
          </>
        )}

{isMobile ? (
  <ul className={`nav-menu-mobile ${isOpen ? 'show' : ''}`}>
    <li className="nav-item" onClick={() => goTo('/services')}>Services</li>
    <li className="nav-item" onClick={() => goTo('/drones')}>Drones</li>
    <li className="nav-item" onClick={() => goTo('/faq')}>FAQ</li>
    <li className="nav-item" onClick={() => goTo('/about-us')}>About Us</li>
    <li className="nav-item book-appointment" onClick={() => goTo('/book')}>Book a Flight</li>
  </ul>
) : (
  <ul className="nav-menu-desktop">
    <li className="nav-item" onClick={() => goTo('/services')}>Services</li>
    <li className="nav-item" onClick={() => goTo('/drones')}>Drones</li>
    <li className="nav-item" onClick={() => goTo('/faq')}>FAQ</li>
    <li className="nav-item" onClick={() => goTo('/about-us')}>About Us</li>
    <li className="nav-item book-appointment" onClick={() => goTo('/book')}>Book a Flight</li>
  </ul>
)}


      </div>
    </nav>
  );
}
