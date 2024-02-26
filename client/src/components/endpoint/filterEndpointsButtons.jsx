import React from 'react';
import Button from 'react-bootstrap/Button';

const FilterButtons = ({ filterType, handleFilterChange }) => {
  const filterOptions = [
    { key: 'all', label: 'Show all' },
    { key: 'computer', label: 'Computer' },
    { key: 'server', label: 'Server' }
  ];

  return (
    <div className="mb-3 d-flex justify-content-start">
      {filterOptions.map(({ key, label }) => (
        <Button
          key={key}
          onClick={() => handleFilterChange(key)}
          variant={filterType === key ? 'primary' : 'secondary'}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;