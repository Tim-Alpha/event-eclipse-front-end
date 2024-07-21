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

const FeatureIcon = ({ icon, description }) => {
  return (
    <div className="feature-icon">
      <FontAwesomeIcon className="feature-icons" icon={icons[icon]} size="3x" />
      <p>{description}</p>
    </div>
  );
};

export default FeatureIcon;
