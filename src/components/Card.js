import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Card.css';
import defaultImage from '../assets/images/venue2.jpg';

const Card = ({ image, title, description, userName, userProfile, ownerName, ownerProfile, verified, footer, rating, width, height, onClick, venueUUID, scaleOnHover = false }) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [ownerSrc, setOwnerSrc] = useState(ownerProfile);
  const [userSrc, setUserSrc] = useState(userProfile);
  const [loading, setLoading] = useState(!!image);

  const handleError = () => {
    setImgSrc(defaultImage);
    setOwnerSrc(ownerProfile);
    setUserSrc(userProfile);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const cardStyle = {
    width: width || '100%',
    height: height || 'auto',
    cursor: 'pointer'
  };

  const scaleClass = scaleOnHover ? 'scale-hover' : '';

  return (
    <div className={`card ${scaleClass}`} style={cardStyle} onClick={() => onClick(venueUUID)}>
      {image && (
        <>
          {loading && <Skeleton className="card-image-skeleton" />}
          <img
            src={imgSrc}
            alt={title}
            onError={handleError}
            onLoad={handleLoad}
            style={{ display: loading ? 'none' : 'block' }}
          />
        </>
      )}
      <div className="card-content">
        {title && <h3>{title}</h3>}
        {ownerName &&
          <div className='display-owner'>
            <div>
              {<p id='owner-lable'>owner <span className='verified' >{verified ? "Verified" : ""}</span></p>}
              {<h3>{ownerName}</h3>}
            </div>
            {ownerProfile && <img alt={ownerName} id='owner-profile' src={ownerSrc || ownerProfile} />}
          </div>}
        {userName &&
          <div className='display-owner'>
            <div>
              {<p id='owner-lable'><span className='verified' >{rating && <div className="rating">{rating}</div>}</span></p>}
              {<h3>{userName}</h3>}
            </div>
            {userProfile && <img alt={userName} id='owner-profile' src={userSrc || userProfile} />}
          </div>}
        {/* {rating && <div className="rating">{rating}</div>} */}
        {description && <p>{description}</p>}
        {footer && <div className="card-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Card;
