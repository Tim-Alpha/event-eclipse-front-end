import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Gallery.css';
import { useNavigate } from 'react-router-dom';

const Gallery = ({ galleries, venueUUID, venue }) => {
    console.log("GALLERIES: -> ", galleries)
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))
    const handleGalleryCreation = () => {
        navigate(`/venues/${venueUUID}/gallery/create`);
    }

    return (
        <div className="gallery">
            {user && user.username === venue.owner.username && (
                <button onClick={handleGalleryCreation}>Create Gallery</button>
            )}
            <h2>Gallery</h2>
            {galleries.length > 0 ? (
                <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
                    {galleries.map((gallery, index) => (
                        <div key={index}>
                            {gallery.url_type === 'jpg' || gallery.url_type === 'jpeg' || gallery.url_type === 'png' || gallery.url_type === 'webp' ? (
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
            )}
        </div>
    );
};

export default Gallery;
