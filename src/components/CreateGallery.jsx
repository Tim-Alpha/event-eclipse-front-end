import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateGallery.css';
import Spinner from './Spinner';

const CreateGallery = () => {
  const { uuid: venueUUID } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select an image file to upload.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`gallery/${venueUUID}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'event-token': `${localStorage.getItem('token')}`
        },
      });
      setSuccess('Gallery image uploaded successfully!');
      console.log("Gallery image uploaded", response.data);
      setFile(null);
      navigate(`/venues/${venueUUID}`);
    } catch (err) {
      setError('Failed to upload the image. Please try again.');
      console.error('Error uploading image:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-container">
      <h2>Upload photos for your venue</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="gallery-form">
        <div className="form-group">
          <label htmlFor="file">Select Image</label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleFileChange}
            required
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <button type="submit" className="submit-button">Upload Image</button>
        )}
      </form>
      <button onClick={() => navigate(`/venues/${venueUUID}`)} className="back-button">
        Back to Venue
      </button>
    </div>
  );
};

export default CreateGallery;
