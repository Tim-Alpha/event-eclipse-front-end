import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to EventEclipse</h1>
        <p>The Revolutionary Digital Heaven for finding and booking event venues</p>
        <div className="hero-buttons">
          <button className="btn view-venue">View Venue</button>
          <button className="btn book-now">Book Now</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
