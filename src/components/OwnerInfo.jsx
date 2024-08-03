import React from 'react';
import './OwnerInfo.css';

const OwnerInfo = ({ owner }) => {
    return (
        <div className="owner-info">
            <img src={owner.profileUrl} alt={owner.username} className="owner-profile" />
            <div>
                <p>{owner.firstName} {owner.lastName}</p>
                <p>{owner.email}</p>
                <p>{owner.mobile}</p>
            </div>
        </div>
    );
};

export default OwnerInfo;
