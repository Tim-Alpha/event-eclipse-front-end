import React from 'react';
import './ProfileDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const ProfileDetails = ({ isOpen, user }) => {
  return (
    <div className={`profile-details ${isOpen ? 'open' : ''}`}>
      <img src={user?.profileUrl || ''} alt="Profile" className="profile-image-large" />
      <h3>{user?.name || 'User'}</h3>
      <p>{user?.email || 'user@example.com'}</p>
      <p>Username: {user?.username || 'username'}</p>
      <p>Address: {user?.address || 'Address'}</p>
      <button className="edit-button">
        <FontAwesomeIcon icon={faEdit} /> Edit Profile
      </button>
    </div>
  );
}

export default ProfileDetails;
