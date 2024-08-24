import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-heading">Welcome to Event Eclipse</h1>
        <p className="hero-para">The Revolutionary Digital Heaven for finding and booking event venues</p>
        <div className="hero-buttons">
          <button className="btn book-now" onClick={() => navigate('/venues/search')}>Book Now</button>
          <button className="btn book-now" onClick={() => navigate('/venues/create')}>Join US</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
