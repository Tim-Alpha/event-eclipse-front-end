import React, { useEffect, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBars, faHome, faUser, faBriefcase, faEnvelope, faBell, faCog, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../slices/userSlice';
import ProfileDetails from './ProfileDetails';
import axios from 'axios';
import defaultProfilePicture from '../assets/images/profile.jpg';
import useIsLoggedIn from './useIsLoggedIn';

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useIsLoggedIn();
  const userState = useSelector((state) => state.user);
  const { user } = userState;
  const userProfile = user?.profileUrl || defaultProfilePicture;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await axios.get('users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = response.data.user;
          dispatch(login({ token, user }));
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [dispatch, token]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className={`header ${hidden ? 'hidden' : ''}`}>
      <div className="logo">Event Eclipse</div>
      <nav>
        <ul>
          <li><a href="#home"><FontAwesomeIcon icon={faHome} /> Home</a></li>
          <li><a href="#why-us"><FontAwesomeIcon icon={faUser} /> Why Us?</a></li>
          <li><a href="#explore-venues"><FontAwesomeIcon icon={faBriefcase} /> Explore Venues</a></li>
          <li><a href="#contact"><FontAwesomeIcon icon={faEnvelope} /> Contact Us</a></li>
          <li><a href="#join-us"><FontAwesomeIcon icon={faBell} /> Join Us</a></li>
          <li><a href="#book"><FontAwesomeIcon icon={faBookOpen} /> Book</a></li>
        </ul>
      </nav>
      <div className="desktop-menu">
        {!token ? (
          <button onClick={handleLogin} className="btn">Login</button>
        ) : (
          <>
            <img src={userProfile} alt="Profile" className="profile-image" onClick={toggleProfile} />
            <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" onClick={handleLogout} />
            <ProfileDetails isOpen={profileOpen} user={user} />
          </>
        )}
      </div>
      {token && (
        <div className="menu">
          <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleMenu} />
        </div>
      )}
      {token && (
        <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <img src={userProfile} alt="Profile" className="profile-image" />
            <h3>{user?.name || 'User'}</h3>
            <p>{user?.email || 'user@example.com'}</p>
          </div>
          <ul>
            <li><a href="#home"><FontAwesomeIcon icon={faHome} /> Home</a></li>
            <li><a href="#profile"><FontAwesomeIcon icon={faUser} /> My Profile</a></li>
            <li><a href="#vacancy"><FontAwesomeIcon icon={faBriefcase} /> My Vacancy</a></li>
            <li><a href="#message"><FontAwesomeIcon icon={faEnvelope} /> Message</a></li>
            <li><a href="#subscription"><FontAwesomeIcon icon={faBell} /> Subscription</a></li>
            <li><a href="#notification"><FontAwesomeIcon icon={faBell} /> Notification</a></li>
            <li><a href="#settings"><FontAwesomeIcon icon={faCog} /> Setting</a></li>
          </ul>
          <div className="logout">
            <a onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
