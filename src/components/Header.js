import React, { useEffect, useState, useRef } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBars, faHome, faUser, faBriefcase, faEnvelope, faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../slices/userSlice';
import defaultProfilePicture from '../assets/images/profile.jpg';
import useIsLoggedIn from './useIsLoggedIn';
import axios from 'axios';

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useIsLoggedIn();
  const userState = useSelector((state) => state.user);
  const { user } = userState;
  const userProfile = user?.profileUrl || defaultProfilePicture;
  const sidebarRef = useRef(null);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll = currentScroll;

      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const parsedUser = user && user !== 'undefined' ? JSON.parse(user) : null;

    if (token && parsedUser) {
      dispatch(login({ token, user: parsedUser }));
    }
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('notification/get', {
          headers: {
            'event-token': localStorage.getItem('token')
          }
        });

        if (response.status === 200) {
          setNotifications(response.data.notifications);

          const unseen = response.data.notifications.filter(notification => notification.has_seen === null).length;
          setUnseenCount(unseen);

        } else {
          console.error('Failed to retrieve notifications:', response.data.message);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();

  }, [dispatch, token, setNotifications, setUnseenCount]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navigateHome = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const displayNotification = async () => {
    setShowNotification((prevState) => !prevState);

  };

  const markAsSeen = async (uuid) => {
    try {
      const currentDate = new Date().toISOString();
      const response = await axios.put(
        `notification/${uuid}/update`,
        { has_seen: currentDate },
        {
          headers: {
            'event-token': localStorage.getItem('token')
          }
        }
      );

      if (response.status === 200) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.uuid === uuid ? { ...notification, has_seen: new Date() } : notification
          )
        );
        const unseen = notifications.filter(notification => notification.has_seen === null).length - 1;
        setUnseenCount(unseen);
      } else {
        console.error('Failed to update notification:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to update notification:', error);
    }
  };

  return (
    <header className={`header ${hidden ? 'hidden' : ''}`}>
      <div className="logo-container">
        <div onClick={navigateHome} className="logo">Event Eclipse</div>
      </div>
      <div className="actions">
        {token ? (
          <>
            <h2>{user?.username}</h2>
            <img src={userProfile} alt="Profile" className="profile-image" onClick={handleProfileClick} />
            <FontAwesomeIcon icon={faBell} className="bell-icon" onClick={displayNotification} />
            <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleMenu} />
            {unseenCount > 0 ? <span className='dot red'></span> : <span className='dot green'></span>}
            {showNotification && (
              <div className='notification-container'>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.uuid} className='notification-item' onClick={() => markAsSeen(notification.uuid)}>
                      <p className={`notification-content ${notification.has_seen === null ? 'bold' : ''}`}>
                        {notification.content}
                      </p>
                      <p className='notification-time'>
                        {new Date(notification.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className='notification-item'>No notifications available</div>
                )}
              </div>
            )}
          </>
        ) : (
          <button onClick={handleLogin} className="btn">Login</button>
        )}
      </div>
      {token && (
        <div ref={sidebarRef} className={`sidebar ${menuOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <img src={userProfile} alt="Profile" className="profile-image-menu" onClick={handleProfileClick} />
            <h1>{user?.username}</h1>
            <p>{user?.email}</p>
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
            <button className='logout-btn-menu' onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
