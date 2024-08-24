import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';
import './BookVenue.css';
import { useNavigate } from 'react-router-dom';

const BookVenue = ({ venueUUID, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eventDate: '',
    startTime: '',
    endTime: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/event/create', {
        ...formData,
        venueUUID,
      });

      if (response.data.status === 'success') {
        toast.success('Event booked successfully!');
        setFormData({
          name: '',
          description: '',
          eventDate: '',
          startTime: '',
          endTime: '',
        });
        onClose();
        navigate(`/venues/${venueUUID}`)
      } else {
        toast.error('Failed to book event. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='booking-container'>
        <div className='booking-inner-container'>
          <button className='close-button' onClick={onClose}>X</button>
          <form className='booking-form' onSubmit={handleSubmit}>
            <h2>Book Venue</h2>
            <div className='form-group'>
              <label>Event Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Event Date</label>
              <input
                type='date'
                name='eventDate'
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Start Time</label>
              <input
                type='time'
                name='startTime'
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>End Time</label>
              <input
                type='time'
                name='endTime'
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
            <button type='submit' disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Book Now'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default BookVenue;
