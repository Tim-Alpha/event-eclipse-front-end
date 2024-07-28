import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const dispatch = useDispatch();
    const venue = useSelector((state) => state.venue.venue);
    const isLoading = useSelector((state) => state.venue.isLoading);

    useEffect(() => {
        dispatch(fetchVenueByUUID(uuid));
    }, [dispatch, uuid]);

    if (isLoading) {
        return <Spinner />;
    }

    if (!venue) {
        return <div>Venue not found</div>;
    }

    const randomColors = [
        '#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb',
        '#64b5f6', '#4fc3f7', '#4db6ac', '#81c784', '#aed581',
        '#dce775', '#fff176', '#ffd54f', '#ffb74d', '#ff8a65',
        '#a1887f', '#90a4ae'
    ];

    const getRandomColor = () => {
        return randomColors[Math.floor(Math.random() * randomColors.length)];
    };

    const handleBooking = () => {
        setIsVisible(true);
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

                <h2>Events</h2>
                <div className="events-grid">
                    {venue.events.map((event, index) => (
                        <div key={index} className="event-box" style={{ backgroundColor: getRandomColor() }}>
                            <p><strong>{event.name}</strong></p>
                            <p>{event.description}</p>
                            <p>{new Date(event.eventDate).toLocaleDateString()}</p>
                            <p>{new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default VenueDetails;
