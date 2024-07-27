import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from './Header';
import './Registration.css';
import './Login.css';
import log from '../assets/lotify/Log.json';
import Lottie from 'lottie-react';
import axios from 'axios';
import { FaUser, FaEyeSlash, FaEye, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import IsMobile from './MobileDetection';
import Loader from './Loader';
import Toaster from './Toaster';
import Footer from './Footer';
import Spinner from './Spinner'

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    role: 'USER',
    dob: '',
    address: '',
    mobile: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [disableClass, setDisableClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [message, setMessage] = useState('');
  const isMobile = IsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    setDisableClass(isMobile ? 'disableMe' : '');
  }, [isMobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('users', formData);
      setStatusCode(201);
      setMessage('Registration Successful');
      console.log('Registration Successful:', response.data);
      localStorage.setItem('userData', JSON.stringify({ mobile: formData.mobile }));
      navigate('/user/verify');
    } catch (error) {
      console.error('Registration Failed:', error);
      setStatusCode(500);
      setMessage('Registration Failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      {statusCode && <Toaster message={message} statusCode={statusCode} />}
      <Header />
      <div className='main'>
        <div className="container">
          <form className='form' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="input-box">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {formData.password === '' ? (
                <FaLock className='icon' />
              ) : passwordVisible ? (
                <FaEyeSlash className='icon' onClick={() => setPasswordVisible(false)} />
              ) : (
                <FaEye className='icon' onClick={() => setPasswordVisible(true)} />
              )}
            </div>
            <div className="input-box">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <FaPhone className="icon" />
              <input
                type="tel"
                placeholder="Mobile"
                id="mobile"
                name="mobile"
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                placeholder="Address"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            {loading ? <Spinner /> : <button type='submit'> Login </button>}
            <div className="login-link">
              <p onClick={() => navigate('/login')}>
                Already have an account? <span className='registerHere'>Login here</span>.
              </p>
            </div>
          </form>
          <div className={`lottie-container ${disableClass}`}>
            <Lottie className={disableClass} animationData={log} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
