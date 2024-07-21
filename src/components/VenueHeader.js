import React from 'react';
import './VenueHeader.css';

const VenueHeader = ({ title, location, address }) => {
  return (
    <div className="venue-header">
      <h1>{title}</h1>
      <p>{location}</p>
      <p>{address}</p>
    </div>
  );
};

export default VenueHeader;
