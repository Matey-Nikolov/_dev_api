import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const ButtonsArchive = ({ handleBackUpChange }) => {
    const filterOptions = [
        { label: 'Back up items', value: 'items' },
        { label: 'Back up block items', value: 'block items' },
        { label: 'Back up policies', value: 'policies'},
    ];

  return (
    <ButtonGroup className="mb-3 d-flex justify-content-center">
      {filterOptions.map((option) => (
        <ToggleButton
          key={option.value}
          id={`filter-${option.value}`}
          type="radio"
          name="filter-options"
          onChange={() => handleBackUpChange(option.value)}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default ButtonsArchive;