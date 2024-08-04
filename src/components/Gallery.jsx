import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Gallery.css';

const Gallery = ({ galleries }) => {
    return (
        <div className="gallery">
            <h2>Gallery</h2>
            {galleries.length > 0 ? (
                <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
                    {galleries.map((gallery, index) => (
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
            ) : (
                <p>No photos available.</p>
            )}
        </div>
    );
};

export default Gallery;
