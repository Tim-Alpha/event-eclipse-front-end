import React from 'react';
import './ExploreVenues.css';
import Card from './Card';

const ExploreVenues = () => {
  return (
    <section id="explore-venues" className="explore-venues">
      <h2>Explore Venues Near You</h2>
      <div className="venues-grid">
        <Card
          image="/assets/images/venue1.jpg"
          title="The Palace House, Chennai"
          description="A beautiful venue for all your events."
          footer="⭐⭐⭐⭐⭐"
        />
        <Card
          image="/assets/images/venue2.jpg"
          title="The Palace House, Chennai"
          description="A beautiful venue for all your events."
          footer="⭐⭐⭐⭐⭐"
        />
        <Card
          image="/assets/images/venue3.jpg"
          title="The Palace House, Chennai"
          description="A beautiful venue for all your events."
          footer="⭐⭐⭐⭐⭐"
        />
        <Card
          image="/assets/images/venue4.jpg"
          title="The Palace House, Chennai"
          description="A beautiful venue for all your events."
          footer="⭐⭐⭐⭐⭐"
        />
      </div>
    </section>
  );
}

export default ExploreVenues;
