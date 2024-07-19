import React from 'react';
import './CustomerReviews.css';
import Card from './Card';

const CustomerReviews = () => {
  return (
    <section className="customer-reviews">
      <h2>Customer Reviews</h2>
      <div className="reviews-grid">
        <Card
          title="Amazing Experience!!!"
          description="The booking was so easy and budget friendly."
          footer={
            <>
              <p>The Palace House, Chennai</p>
              <p>Vivek Roy</p>
            </>
          }
          rating="⭐⭐⭐⭐⭐"
        />
        <Card
          title="Amazing Experience!!!"
          description="The booking was so easy and budget friendly."
          footer={
            <>
              <p>The Palace House, Chennai</p>
              <p>Vivek Roy</p>
            </>
          }
          rating="⭐⭐⭐⭐⭐"
        />
        <Card
          title="Amazing Experience!!!"
          description="The booking was so easy and budget friendly."
          footer={
            <>
              <p>The Palace House, Chennai</p>
              <p>Vivek Roy</p>
            </>
          }
          rating="⭐⭐⭐⭐⭐"
        />
      </div>
    </section>
  );
}

export default CustomerReviews;
