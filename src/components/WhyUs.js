import React from 'react';
import './WhyUs.css';
import FeatureIcon from './FeatureIcon';

const features = [
  {
    icon: "venue",
    title: "Exceptional Venues",
    description: "Discover a curated selection of the most stunning and unique event venues in your city. Each venue is carefully selected to ensure it meets our high standards."
  },
  {
    icon: "pricing",
    title: "Affordable Pricing",
    description: "Enjoy competitive pricing without compromising on quality. We work directly with venue owners to bring you the best deals."
  },
  {
    icon: "booking",
    title: "Hassle-Free Booking",
    description: "Our platform is designed to make booking easy and stress-free. With just a few clicks, you can find the perfect venue and secure your booking."
  },
  {
    icon: "profile",
    title: "Good UI",
    description: "We provide best user experince and display huge list of venues nnear you. Just button way from you, book now, happy to help."
  },
  {
    icon: "support",
    title: "24/7 Customer Support",
    description: "Our dedicated support team is available around the clock to assist you with any questions or concerns you may have."
  }
];

const WhyUs = () => {
  return (
    <section id="why-us" className="why-us">
      <h2>Why Choose Us?</h2>
      <p className="intro">
        We offer a unique combination of features that make us the best choice for finding and booking event venues.
      </p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureIcon
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      <div className="cta">
        <h3>Ready to Find Your Perfect Venue?</h3>
        <button className="btn-primary">Get Started</button>
      </div>
    </section>
  );
}

export default WhyUs;
