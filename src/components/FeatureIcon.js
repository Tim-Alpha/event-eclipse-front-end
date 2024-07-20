import React from 'react';
import './FeatureIcon.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faDollarSign, faCalendarCheck, faHeadset, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const icons = {
  venue: faBuilding,
  pricing: faDollarSign,
  booking: faCalendarCheck,
  support: faHeadset,
  profile: faUserCircle
};

const FeatureIcon = ({ icon, title, description }) => {
  return (
    <div className="feature-icon">
      <div className="icon">
        <FontAwesomeIcon icon={icons[icon]} size="3x" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureIcon;
