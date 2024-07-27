import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Card.css';
import defaultImage from '../assets/images/venue1.jpg'; // Your default image path

const Card = ({ image, title, description, footer, rating, width, height, scaleOnHover = false }) => {
  const [imgSrc, setImgSrc] = useState(image || defaultImage);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setImgSrc(defaultImage);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const cardStyle = {
    width: width || '100%',
    height: height || 'auto'
  };

  const scaleClass = scaleOnHover ? 'scale-hover' : '';

  return (
    <div className={`card ${scaleClass}`} style={cardStyle}>
      {loading && <Skeleton className="card-image-skeleton" />}
      <img
        src={imgSrc}
        alt={title}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: loading ? 'none' : 'block' }}
      />
      <div className="card-content">
        {title && <h3>{title}</h3>}
        {rating && <div className="rating">{rating}</div>}
        {description && <p>{description}</p>}
        {footer && <div className="card-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Card;
