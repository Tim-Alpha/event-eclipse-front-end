import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVenueByUUID } from '../slices/venueSlice';
import Spinner from './Spinner';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './VenueDetails.css';
import Header from './Header';
import Footer from './Footer';
import BookVenue from './BookVenue';

const VenueDetails = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { uuid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const venue = useSelector((state) => state.venue.venue);
    const isLoading = useSelector((state) => state.venue.isLoading);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        dispatch(fetchVenueByUUID(uuid));
    }, [dispatch, uuid]);

    if (isLoading) {
        return <Spinner />;
    }

    if (!venue) {
        return <div>Venue not found</div>;
    }

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

    return (
        <>
            <Header />
            {isVisible && <BookVenue venueUUID={venue.uuid} onClose={handleCloseBooking} />}
            <div className="venue-details">
                <img src={venue.imageUrl} alt={venue.venueName} className="venue-image" />
                <h1>{venue.venueName}</h1>
                <p>{venue.description}</p>
                <p><strong>Location:</strong> {venue.location}</p>
                <p><strong>Capacity:</strong> {venue.capacity}</p>

                <h2>Owner</h2>
                <div className="owner-info">
                    <img src={venue.owner.profileUrl} alt={venue.owner.username} className="owner-profile" />
                    <div>
                        <p>{venue.owner.firstName} {venue.owner.lastName}</p>
                        <p>{venue.owner.email}</p>
                        <p>{venue.owner.mobile}</p>
                    </div>
                    <button onClick={handleBooking} className='btn'>Book Now</button>
                </div>

                <h2>Gallery</h2>
                <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
                    {venue.galleries.map((gallery, index) => (
                        <div key={index}>
                            {gallery.url_type === 'jpg' ? (
                                <img src={gallery.gallery_url} alt={`Gallery ${index}`} />
                            ) : (
                                <video controls loop>
                                    <source src={gallery.gallery_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    ))}
                </Carousel>
            </div>
            <Footer />
        </>
    );
};

export default VenueDetails;
