import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { servicesData, dronesData } from '../data';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesSubMenuOpen, setServicesSubMenuOpen] = useState(false);
  const [dronesSubMenuOpen, setDronesSubMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const navigate = useNavigate();
  const location = useLocation();
  const servicesHoverTimeout = useRef(null);
  const dronesHoverTimeout = useRef(null);

  const toggleMenu = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
      if (isOpen) {
        setServicesSubMenuOpen(false);
        setDronesSubMenuOpen(false);
      }
    }
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    setIsOpen(false);
    setServicesSubMenuOpen(false);
    setDronesSubMenuOpen(false);
  };

  const handleContactClick = () => {
    const targetHash = "#contactForm";
    if (location.pathname.startsWith("/contact")) {
      const element = document.getElementById("contactForm");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/contact${targetHash}`);
    }
    setIsOpen(false);
    setServicesSubMenuOpen(false);
    setDronesSubMenuOpen(false);
  };

  const handleServicesClick = () => {
    if (isMobile) setServicesSubMenuOpen(!servicesSubMenuOpen);
  };

  const handleServicesEnter = () => {
    if (!isMobile) {
      clearTimeout(servicesHoverTimeout.current);
      setServicesSubMenuOpen(true);
    }
  };

  const handleServicesLeave = () => {
    if (!isMobile) {
      servicesHoverTimeout.current = setTimeout(() => setServicesSubMenuOpen(false), 300);
    }
  };

  const handleDronesClick = () => {
    if (isMobile) setDronesSubMenuOpen(!dronesSubMenuOpen);
  };

  const handleDronesEnter = () => {
    if (!isMobile) {
      clearTimeout(dronesHoverTimeout.current);
      setDronesSubMenuOpen(true);
    }
  };

  const handleDronesLeave = () => {
    if (!isMobile) {
      dronesHoverTimeout.current = setTimeout(() => setDronesSubMenuOpen(false), 300);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 769;
      setIsMobile(mobileView);
      if (!mobileView) {
        setIsOpen(false);
        setServicesSubMenuOpen(false);
        setDronesSubMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo" onClick={() => handleNavItemClick('/')}>
            <img
              src="https://i.postimg.cc/4xcYZfvR/i-Stock-1502494966-2.webp"
              alt="Hollywood FPV Logo"
              loading="eager"
              height="65"
              width="85"
            />
          </div>
          <div className="company-name-desktop" onClick={() => handleNavItemClick('/')}>
            Hollywood FPV
          </div>
        </div>

        {isMobile && (
          <div className="menu-icon" onClick={toggleMenu}>
            <div className={isOpen ? 'bar change' : 'bar'}></div>
            <div className={isOpen ? 'bar change' : 'bar'}></div>
            <div className={isOpen ? 'bar change' : 'bar'}></div>
          </div>
        )}

        <ul className={`nav-menu ${isOpen || !isMobile ? 'active' : ''}`}>
          <li
            className="nav-item services-link"
            onClick={handleServicesClick}
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            Services
            {servicesSubMenuOpen && (
              <ul className="sub-nav-menu show" onMouseEnter={handleServicesEnter} onMouseLeave={handleServicesLeave}>
                {Object.entries(servicesData).map(([key, service]) => (
                  <li
                    key={key}
                    className="sub-nav-item"
                    onClick={() => handleNavItemClick(`/services/${key}`)}
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li
            className="nav-item drones-link"
            onClick={handleDronesClick}
            onMouseEnter={handleDronesEnter}
            onMouseLeave={handleDronesLeave}
          >
            Drones
            {dronesSubMenuOpen && (
              <ul className="sub-nav-menu show" onMouseEnter={handleDronesEnter} onMouseLeave={handleDronesLeave}>
                {Object.entries(dronesData).map(([key, drone]) => (
                  <li
                    key={key}
                    className="sub-nav-item"
                    onClick={() => handleNavItemClick(`/drones/${key}`)}
                  >
                    {drone.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="nav-item faq-link" onClick={() => handleNavItemClick('/faq')}>
            FAQ
          </li>

          <li className="nav-item aboutus-link" onClick={() => handleNavItemClick('/about-us')}>
            About Us
          </li>

          <li className="nav-item book-appointment" onClick={handleContactClick}>
            Book a Flight
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
