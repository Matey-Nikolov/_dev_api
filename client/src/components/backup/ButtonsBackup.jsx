import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const ButtonsArchive = ({ handleBackUpChange }) => {
  const filterOptions = [
    { label: 'Backup allow items', value: 'allow items' },
    { label: 'Backup block items', value: 'block items' },
    { label: 'Backup policies', value: 'policies'},
      // { label: 'Backup scanning exclusions', value: 'scanning exclusions'},
      // { label: 'Backup web ', value: 'web'},
      // { label: 'Enviroment reset', value: 'reset'},
  ];

  return (
    <ButtonGroup className="mb-3 d-flex flex-column justify-content-center">
      {filterOptions.map((option) => (
        <>
          <p></p>

          <ToggleButton
          key={option.value}
          id={`filter-${option.value}`}
          type="radio"
          name="filter-options"
          onChange={() => handleBackUpChange(option.value)}
          >
          {option.label}
          </ToggleButton>
        </>

      ))}
    </ButtonGroup>
  );
};

export default ButtonsArchive;