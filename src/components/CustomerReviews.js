import React from 'react';
import './CustomerReviews.css';
import Card from './Card';

const reviews = [
  {
    title: "Amazing Experience!!!",
    description: "The booking was so easy and budget friendly.",
    footer: (
      <>
        <p>The Palace House, Chennai</p>
        <p>Vivek Roy</p>
      </>
    ),
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    title: "Amazing Experience!!!",
    description: "The booking was so easy and budget friendly.",
    footer: (
      <>
        <p>The Palace House, Chennai</p>
        <p>Vivek Roy</p>
      </>
    ),
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    title: "Amazing Experience!!!",
    description: "The booking was so easy and budget friendly.",
    footer: (
      <>
        <p>The Palace House, Chennai</p>
        <p>Vivek Roy</p>
      </>
    ),
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    title: "Amazing Experience!!!",
    description: "The booking was so easy and budget friendly.",
    footer: (
      <>
        <p>The Palace House, Chennai</p>
        <p>Vivek Roy</p>
      </>
    ),
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    title: "Amazing Experience!!!",
    description: "The booking was so easy and budget friendly.",
    footer: (
      <>
        <p>The Palace House, Chennai</p>
        <p>Vivek Roy</p>
      </>
    ),
    rating: "⭐⭐⭐⭐⭐"
  },
];

const CustomerReviews = () => {
  return (
    <section className="customer-reviews">
      <h2 className='section-heading'>Customer Reviews</h2>
      <div className="reviews-container">
        <div className="reviews-row">
          <div className="reviews-grid scroll-left">
            {reviews.map((review, index) => (
              <Card
                key={index}
                title={review.title}
                description={review.description}
                footer={review.footer}
                rating={review.rating}
                width="600px"
                height="160px"
                scaleOnHover={true}
              />
            ))}
            {reviews.map((review, index) => (
              <Card
                key={`dup-${index}`}
                title={review.title}
                description={review.description}
                footer={review.footer}
                rating={review.rating}
                width="600px"
                height="160px"
                scaleOnHover={true}
              />
            ))}
          </div>
        </div>
        <div className="reviews-row">
          <div className="reviews-grid scroll-right">
            {reviews.map((review, index) => (
              <Card
                key={index}
                title={review.title}
                description={review.description}
                footer={review.footer}
                rating={review.rating}
                width="600px"
                height="160px"
                scaleOnHover={true}
              />
            ))}
            {reviews.map((review, index) => (
              <Card
                key={`dup-${index}`}
                title={review.title}
                description={review.description}
                footer={review.footer}
                rating={review.rating}
                width="600px"
                height="160px"
                scaleOnHover={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerReviews;
