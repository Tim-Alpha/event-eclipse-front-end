import React from 'react';
import './ProfileDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from '../assets/images/profile.jpg';

const ProfileDetails = ({ isOpen }) => {
  return (
    <div className={`profile-details ${isOpen ? 'open' : ''}`}>
      <img src={ProfileImage} alt="Profile" className="profile-image-large" />
      <h3>Rlexandra</h3>
      <p>rlexandra@gmail.com</p>
      <p>Username: rlexandra</p>
      <p>Address: 1234 Street Name, City, Country</p>
      <button className="edit-button">
        <FontAwesomeIcon icon={faEdit} /> Edit Profile
      </button>
    </div>
  );
}

export default ProfileDetails;
