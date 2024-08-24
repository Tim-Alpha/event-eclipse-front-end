import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PostReview.css';
import Spinner from './Spinner';

const PostReview = ({ venueUUID }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content || rating === 0) {
      setError('Please provide both content and a rating.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/review/create', { content, rating, venueUUID });
      setSuccess(true);
      setError(null);
      console.log('Review created successfully:', response.data);
      navigate(`/venue/${venueUUID}`);
    } catch (err) {
      setError('Failed to submit the review. Please try again.');
      console.error('Review creation failed:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-review-container">
      <h2>Post a Review</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Review submitted successfully!</div>}
      <form onSubmit={handleSubmit} className="post-review-form">
        <div className="form-group">
          <label htmlFor="content">Review Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Very Bad</option>
            <option value="2">2 - Bad</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        {loading ? <Spinner /> : <button type="submit" className="submit-button">Submit Review</button>}
      </form>
    </div>
  );
};

export default PostReview;