import React from 'react';
import './Reviews.css';

const Reviews = ({ reviews }) => {
    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.uuid} className="review">
                        <p><strong>{review.user.username}</strong></p>
                        <p>Rating: {review.rating}</p>
                        <p>{review.content}</p>
                        <p><small>Posted on: {new Date(review.createdAt).toLocaleDateString()}</small></p>
                    </div>
                ))
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
};

export default Reviews;
