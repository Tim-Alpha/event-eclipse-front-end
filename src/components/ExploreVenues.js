import React, { useEffect, useState } from 'react';
import './ExploreVenues.css';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDefaultResults } from '../slices/searchSlice';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const ExploreVenues = () => {
  const [maxVenues, setMaxVenues] = useState(9);
  const results = useSelector((state) => state.search.results);
  const isLoading = useSelector((state) => state.search.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (results.length === 0) {
      dispatch(fetchDefaultResults());
    }
  }, [dispatch, results.length]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMaxVenues(10);
      } else {
        setMaxVenues(9);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (uuid) => {
    navigate(`/venues/${uuid}`);
  };

  const displayedResults = results.slice(0, maxVenues);

  return (
    <section id="explore-venues" className="explore-venues">
      <h2 className='section-heading'>Explore Venues Near You</h2>
      <div className='venues-container'>
        {isLoading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          <div className="venues-grid">
            {displayedResults.map((venue, index) => (
              <Card
                key={index}
                image={venue.imageUrl}
                title={truncateText(venue.name, 30)}
                description={venue.description}
                ownerName={venue.owner.firstName? venue.owner.firstName + " " + venue.owner.lastName : venue.owner.username}
                ownerProfile={venue.owner.profileUrl}
                verified={venue.owner.isEmailVerified? venue.owner.isEmailVerified : venue.owner.isMobileVerified}
                footer={`Location: ${venue.location}`}
                width="300px"
                height="350px"
                onClick={handleCardClick}
                venueUUID={venue.uuid}
                scaleOnHover={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ExploreVenues;
