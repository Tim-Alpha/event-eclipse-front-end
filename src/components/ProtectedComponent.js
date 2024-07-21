import React from 'react';

const ProtectedComponent = () => {
  return (
    <div>
      <h2>This is a protected component</h2>
      <p>You can only see this if you are logged in.</p>
    </div>
  );
};

export default ProtectedComponent;
