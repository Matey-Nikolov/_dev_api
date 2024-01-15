import React from 'react';
import Button from 'react-bootstrap/Button';

const FilterButtons = ({ filterType, handleFilterChange, handleSortChange, sortOrder }) => {
  const filterOptions = [
    { key: 'all', label: 'Show all' },
    { key: 'computer', label: 'Computer' },
    { key: 'server', label: 'Server' }
  ];

  return (
    <div className="mb-3">
      {filterOptions.map(({ key, label }) => (
        <Button
          key={key}
          onClick={() => handleFilterChange(key)}
          variant={filterType === key ? 'primary' : 'secondary'}
        >
          {label}
        </Button>
      ))}
      <Button onClick={handleSortChange} variant="info">
        Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </Button>
    </div>
  );
};

export default FilterButtons;