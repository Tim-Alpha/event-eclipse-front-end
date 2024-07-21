import React from 'react';
import ImageCarousel from './ImageCarousel';
import VenueHeader from './VenueHeader';
import VenueRating from './VenueRating';
import VenueTabs from './VenueTabs';
import PricingInfo from './PricingInfo';
import './VenueDetails.css';

const VenueDetails = () => {
  const images = [
    { src: '/path/to/image1.jpg', alt: 'Image 1' },
    { src: '/path/to/image2.jpg', alt: 'Image 2' },
    // Add more images as needed
  ];

  const pricing = [
    { label: 'Veg price per plate', value: '500/-' },
    { label: 'Non-veg price per plate', value: '800/-' },
    // Add more pricing items as needed
  ];

  const tabs = [
    { name: 'pricing', label: 'Pricing' },
    { name: 'banquets', label: 'Banquets' },
    { name: 'projects', label: 'Projects' },
    { name: 'about', label: 'About' },
    { name: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="venue-details">
      <ImageCarousel images={images} />
      <VenueHeader title="The Palace House" location="Injambakar, Chennai" address="Injambakar, Cholamandal Artists Village, Injambakkam..." />
      <VenueRating rating="4.5" reviews="14" />
      <VenueTabs tabs={tabs}>
        <PricingInfo name="pricing" pricing={pricing} />
        {/* Add other tab content components here */}
      </VenueTabs>
    </div>
  );
};

export default VenueDetails;
