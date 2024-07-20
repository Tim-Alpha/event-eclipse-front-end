import React from 'react';
import './Card.css';

const Card = ({ image, title, description, footer, rating, width, height, scaleOnHover = false }) => {
  const cardStyle = {
    width: width || '100%',
    height: height || 'auto'
  };

  const scaleClass = scaleOnHover ? 'scale-hover' : '';

  return (
    <div className={`card ${scaleClass}`} style={cardStyle}>
      {image && <img src={image} alt={title} />}
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
