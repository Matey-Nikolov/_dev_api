import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const FilterButtons = ({ filterType, handleFilterChange }) => {
    const filterOptions = [
      { label: 'All', value: 'all' },
      { label: 'High', value: 'high', variant: 'danger' },
      { label: 'Medium', value: 'medium', variant: 'warning' },
      { label: 'Low', value: 'low', variant: 'success' }
    ];

  return (
    <ButtonGroup className="mb-3 d-flex justify-content-center">
      {filterOptions.map((option) => (
        <ToggleButton
          key={option.value}
          id={`filter-${option.value}`}
          type="radio"
          variant={option.variant || 'secondary'}
          name="filter-options"
          value={option.value}
          checked={filterType === option.value}
          onChange={() => handleFilterChange(option.value)}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default FilterButtons;