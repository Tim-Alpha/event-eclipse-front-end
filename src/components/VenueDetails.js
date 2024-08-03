import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVenueByUUID } from '../slices/venueSlice';
import { fetchReviewsByVenueUUID } from '../slices/reviewSlice';
import Spinner from './Spinner';
import VenueInfo from './VenueInfo';
import OwnerInfo from './OwnerInfo';
import Gallery from './Gallery';
import Reviews from './Reviews';
import BookVenue from './BookVenue';
import Header from './Header';
import Footer from './Footer';
import './VenueDetails.css';

const VenueDetails = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { uuid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const venue = useSelector((state) => state.venue.venue);
    const isLoading = useSelector((state) => state.venue.isLoading);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const reviews = useSelector((state) => state.reviews.reviews);
    const reviewsLoading = useSelector((state) => state.reviews.isLoading);

    const fetchReviews = useCallback(() => {
        dispatch(fetchReviewsByVenueUUID(uuid));
    }, [dispatch, uuid]);

    useEffect(() => {
        dispatch(fetchVenueByUUID(uuid));
        fetchReviews();
    }, [dispatch, uuid, fetchReviews]);

    const handleBooking = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            setIsVisible(true);
        }
    };

    const handleCloseBooking = () => {
        setIsVisible(false);
    };

    if (isLoading || reviewsLoading) {
        return <Spinner />;
    }

    if (!venue) {
        return <div>Venue not found</div>;
    }

    return (
        <>
            <Header />
            {isVisible && <BookVenue venueUUID={venue.uuid} onClose={handleCloseBooking} />}
            <div className="venue-details">
                <VenueInfo venue={venue} onBook={handleBooking} />
                <OwnerInfo owner={venue.owner} />
                <Gallery galleries={venue.galleries} />
                <Reviews reviews={reviews} />
            </div>
            <Footer />
        </>
    );
};

export default VenueDetails;
