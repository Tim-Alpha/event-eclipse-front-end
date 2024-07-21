import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import './DialogBox.css';

const DialogBoxPopup = ({ statusCode }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  let icon, color, message;

  switch (statusCode) {
    case 200:
      icon = <AiOutlineCheckCircle />;
      color = 'green';
      message = 'Authentication complete';
      break;
    case 400:
      icon = <AiOutlineCloseCircle />;
      color = 'yellow';
      message = 'Bad Request';
      break;
    case 500:
      icon = <AiOutlineCloseCircle />;
      color = 'red';
      message = 'Server Error';
      break;
    default:
      return null;
  }

  return (
    <div className="notification-popup" style={{ borderColor: color }}>
      <div className="notification-icon" style={{ color }}>
        {icon}
      </div>
      <div className="notification-message">{message}</div>
    </div>
  );
};

export default DialogBoxPopup;
