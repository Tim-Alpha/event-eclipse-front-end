import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Event Eclipse</div>
      <nav>
        <ul>
          <li><a href="#why-us">Why Us?</a></li>
          <li><a href="#explore-venues">Explore Venues</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
