import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateVenue.css';
import Header from './Header';
import Footer from './Footer';
import Spinner from './Spinner';

const CreateVenue = () => {
  const [venueData, setVenueData] = useState({
    name: '',
    description: '',
    location: '',
    capacity: '',
    file: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setVenueData({
      ...venueData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, description, location, capacity, file } = venueData;

    if (!name || !description || !location || !capacity || !file) {
      setError('All required fields must be filled, including an image, location, and capacity.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('capacity', capacity);
    formData.append('file', file);

    try {
      const response = await axios.post('/venues', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setError(null);
      console.log('Venue created successfully:', response.data);
      navigate(`/venues/${response.data.venue.uuid}`);
    } catch (err) {
      setError('Failed to create the venue. Please try again.');
      console.error('Venue creation failed:', err.response?.data || err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="create-venue-container">
        <h2>Create Venue</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Venue created successfully!</div>}
        <form onSubmit={handleSubmit} className="create-venue-form">
          <div className="form-group">
            <label htmlFor="name">Venue Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={venueData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={venueData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={venueData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={venueData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Venue Image</label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              required
            />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <button type="submit" className="submit-button">
              Create Venue
            </button>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateVenue;
