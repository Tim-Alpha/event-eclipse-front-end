import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Gallery.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const Gallery = ({ venueUUID, venue }) => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/gallery/${venueUUID}`);
                if (response.status === 200) {
                    setGalleries(response.data.galleries);
                } else {
                    console.error('Failed to fetch galleries');
                }
            } catch (error) {
                console.error('Error fetching galleries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleries();
    }, [venueUUID]);

    const handleGalleryCreation = () => {
        navigate(`/venues/${venueUUID}/gallery/create`);
    };

    return (
        <div className="gallery">
            {user && user.username === venue.owner.username && (
                <button onClick={handleGalleryCreation}>Create Gallery</button>
            )}
            <h2>Gallery</h2>
            {loading ? (
                <Spinner />
            ) : (
                galleries.length > 0 ? (
                    <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
                        {galleries.map((gallery, index) => (
                            <div key={index}>
                                {['jpg', 'jpeg', 'png', 'webp'].includes(gallery.url_type) ? (
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
                ) : (
                    <p>No photos available.</p>
                )
            )}
        </div>
    );
};

export default Gallery;
