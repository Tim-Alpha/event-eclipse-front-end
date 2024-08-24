import React from 'react';
import './VenueInfo.css';

const VenueInfo = ({ venue, onBook }) => {
    return (
        <div className="venue-info">
            <img src={venue.imageUrl} alt={venue.name} className="venue-image" />
            <h1>{venue.name}</h1>
            <p>{venue.description}</p>
            <p><strong>Location:</strong> {venue.location}</p>
            <p><strong>Capacity:</strong> {venue.capacity}</p>
            <button onClick={onBook} className='btn'>Book Now</button>
        </div>
    );
};

export default VenueInfo;
