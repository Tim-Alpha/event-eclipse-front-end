import React, { useState, useEffect } from 'react';
import './Toaster.css';

const Toaster = ({ message, statusCode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const getStatusClass = () => {
    if (statusCode === 200 || statusCode === 201) return 'green';
    if (statusCode === 400) return 'yellow';
    return 'red';
  };

  return (
    <div className={`toaster ${visible ? 'visible' : ''} ${getStatusClass()}`}>
      {message}
    </div>
  );
};

export default Toaster;
