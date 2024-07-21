import React from 'react';
import './VenueRating.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const VenueRating = ({ rating, reviews }) => {
  return (
    <div className="venue-rating">
      <FontAwesomeIcon icon={faStar} className="star-icon" />
      <span className="rating">{rating}</span>
      <span className="reviews">Excellent ({reviews} Reviews)</span>
    </div>
  );
};

export default VenueRating;
