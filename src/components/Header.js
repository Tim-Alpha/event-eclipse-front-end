import React, { useEffect, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBars, faHome, faUser, faBriefcase, faEnvelope, faBell, faCog, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from '../assets/images/profile.jpg';

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timer;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = window.scrollY;

      clearTimeout(timer);
      timer = setTimeout(() => {
        setHidden(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`header ${hidden ? 'hidden' : ''}`}>
      <div className="logo">Event Eclipse</div>
      <nav>
        <ul>
          <li><a href="#home"><FontAwesomeIcon icon={faHome} /> Home</a></li>
          <li><a href="#why-us"><FontAwesomeIcon icon={faUser} /> Why Us?</a></li>
          <li><a href="#explore-venues"><FontAwesomeIcon icon={faBriefcase} /> Explore Venues</a></li>
          <li><a href="#contact"><FontAwesomeIcon icon={faEnvelope} /> Contact Us</a></li>
          <li><a href="#join-us"><FontAwesomeIcon icon={faBell} /> Join Us</a></li>
          <li><a href="#book"><FontAwesomeIcon icon={faBookOpen} /> Book</a></li>
        </ul>
      </nav>
      <div className="destop-menu">
        <img src={ProfileImage} alt="Profile" className="profile-image" />
        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
      </div>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={ProfileImage} alt="Profile" className="profile-image" />
          <h3>Rlexandra</h3>
          <p>rlexandra@gmail.com</p>
        </div>
        <ul>
          <li><a href="#home"><FontAwesomeIcon icon={faHome} /> Home</a></li>
          <li><a href="#profile"><FontAwesomeIcon icon={faUser} /> My Profile</a></li>
          <li><a href="#vacancy"><FontAwesomeIcon icon={faBriefcase} /> My Vacancy</a></li>
          <li><a href="#message"><FontAwesomeIcon icon={faEnvelope} /> Message</a></li>
          <li><a href="#subscription"><FontAwesomeIcon icon={faBell} /> Subscription</a></li>
          <li><a href="#notification"><FontAwesomeIcon icon={faBell} /> Notification</a></li>
          <li><a href="#settings"><FontAwesomeIcon icon={faCog} /> Setting</a></li>
        </ul>
        <div className="logout">
          <a href="#logout"><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</a>
        </div>
      </div>
      <div className="menu">
        <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleMenu} />
      </div>
    </header>
  );
}

export default Header;
