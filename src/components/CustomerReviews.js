import React, { useEffect, useState } from 'react';
import './CustomerReviews.css';
import Card from './Card';
import axios from 'axios';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/review/get-all');
        setReviews(response.data.review);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="customer-reviews">
      <h2 className='section-heading'>Customer Reviews</h2>
      <div className="reviews-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="reviews-row">
              <div className="reviews-grid scroll-left">
                {reviews.map((review, index) => (
                  <Card
                    key={index}
                    title={truncateText(review.content, 30)}
                    // description={review.content}
                    userName={review.user.firstName ? review.user.firstName + " " + review.user.lastName : review.user.username}
                    userProfile={review.user.profileUrl}
                    rating={'⭐'.repeat(review.rating)}
                    footer={(
                      <>
                        <p>{review.venue.venueName}</p>
                        <p>{"Location: " + review.venue?.location}</p>
                      </>
                    )}
                    width="600px"
                    height="160px"
                    scaleOnHover={true}
                  />
                ))}
                {reviews.map((review, index) => (
                  <Card
                    key={`dup-${index}`}
                    title={truncateText(review.content, 30)}
                    footer={(
                      <>
                        <p>{review.venue.venueName}</p>
                        <p>{"Location: " + review.venue?.location}</p>
                      </>
                    )}
                    // description={review.content}
                    userName={review.user.firstName ? review.user.firstName + " " + review.user.lastName : review.user.username}
                    userProfile={review.user.profileUrl}
                    rating={'⭐'.repeat(review.rating)}
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
                    title={truncateText(review.content, 30)}
                    // description={review.content}
                    userName={review.user.firstName ? review.user.firstName + " " + review.user.lastName : review.user.username}
                    userProfile={review.user.profileUrl}
                    rating={'⭐'.repeat(review.rating)}
                    footer={(
                      <>
                        <p>{review.venue.venueName}</p>
                        <p>{"Location: " + review.venue?.location}</p>
                      </>
                    )}
                    width="600px"
                    height="160px"
                    scaleOnHover={true}
                  />
                ))}
                {reviews.map((review, index) => (
                  <Card
                    key={`dup-${index}`}
                    title={truncateText(review.content, 20)}
                    // description={review.content}
                    userName={review.user.firstName ? review.user.firstName + " " + review.user.lastName : review.user.username}
                    userProfile={review.user.profileUrl}
                    rating={'⭐'.repeat(review.rating)}
                    footer={(
                      <>
                        <p>{review.venue.venueName}</p>
                        <p>{"Location: " + review.venue?.location}</p>
                      </>
                    )}
                    width="600px"
                    height="160px"
                    scaleOnHover={true}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default CustomerReviews;
