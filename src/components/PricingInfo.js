import React from 'react';
import './PricingInfo.css';

const PricingInfo = ({ isActive, pricing }) => {
  if (!isActive) return null;
  return (
    <div className="pricing-info">
      <h2>Pricing Info</h2>
      {pricing.map((price, index) => (
        <div key={index} className="price-item">
          <span className="price-label">{price.label}</span>
          <span className="price-value">{price.value}</span>
        </div>
      ))}
      <button className="show-more">Show more</button>
    </div>
  );
};

export default PricingInfo;
