import React from 'react';
import Button from 'react-bootstrap/Button';

const ViewButtons = ({ handleButtonClick, information }) => {
  const viewButtons = [
    { key: 'alerts', label: 'View alerts' },
    { key: 'endpoints', label: 'View endpoints' },
    // { key: 'events', label: 'Server' }
  ];

  return (
    <div className="mb-3">
      {viewButtons.map(({ key, label }) => (
        <Button
          key={key}
          onClick={() => handleButtonClick(key, information)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ViewButtons;
