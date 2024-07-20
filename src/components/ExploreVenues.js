import React from 'react';
import './ExploreVenues.css';
import Card from './Card';
import Venue1 from '../assets/images/venue1.jpg';
import Venue2 from '../assets/images/venue2.jpg';
import Venue3 from '../assets/images/venue3.jpg';
import Venue4 from '../assets/images/venue4.jpg';

const venues = [
  {
    image: Venue1,
    title: "The Palace House, Chennai",
    description: "A beautiful venue for all your events.",
    footer: "⭐⭐⭐⭐⭐"
  },
  {
    image: Venue2,
    title: "The Palace House, Chennai",
    description: "A beautiful venue for all your events.",
    footer: "⭐⭐⭐⭐⭐"
  },
  {
    image: Venue3,
    title: "The Palace House, Chennai",
    description: "A beautiful venue for all your events.",
    footer: "⭐⭐⭐⭐⭐"
  },
  {
    image: Venue4,
    title: "The Palace House, Chennai",
    description: "A beautiful venue for all your events.",
    footer: "⭐⭐⭐⭐⭐"
  },
  {
    image: Venue3,
    title: "The Palace House, Chennai",
    description: "A beautiful venue for all your events.",
    footer: "⭐⭐⭐⭐⭐"
  },
  {
    image: Venue4,
    title: "The Palace House, Chennai",
    description: "A beautiful venue for all your events.",
    footer: "⭐⭐⭐⭐⭐"
  },
  {
    image: Venue3,
    title: "The Palace House, Chennai",
    description: "A beautiful venue for all your events.",
    footer: "⭐⭐⭐⭐⭐"
  },
  {
    image: Venue4,
    title: "The Palace House, Chennai",
    description: "A beautiful venue for all your events.",
    footer: "⭐⭐⭐⭐⭐"
  }
];

const ExploreVenues = () => {
  return (
    <section id="explore-venues" className="explore-venues">
      <h2>Explore Venues Near You</h2>
      <div className='venues-container'>
        <div className="venues-grid">
          {venues.map((venue, index) => (
            <Card
              key={index}
              image={venue.image}
              title={venue.title}
              description={venue.description}
              footer={venue.footer}
              width="300px"
              height="400px"
              scaleOnHover={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExploreVenues;
