import React from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  return (
    <div className="image-carousel">
      {images.map((image, index) => (
        <div key={index} className="carousel-item">
          <img src={image.src} alt={image.alt} />
        </div>
      ))}
      <div className="carousel-controls">
        <button className="prev">❮</button>
        <button className="next">❯</button>
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span key={index} className="indicator"></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
