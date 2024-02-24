import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const ButtonsArchive = ({ handleBackUpChange, role }) => {
  const filterOptions = [
    { label: 'Backup allow items', value: 'allow items' },
    { label: 'Backup block items', value: 'block items' },
    { label: 'Backup policies', value: 'policies'},
    { label: 'Backup scanning exclusions', value: 'scanning exclusions'},
    { label: 'Backup download installers', value: 'exclusions download'},
    
    { label: 'Installers download', roleNeeded: 'R/W', value: 'download'},
    { label: 'Enviroment reset', value: 'reset', roleNeeded: 'R/W', variant: 'danger'}
  ];

  return (
    <ButtonGroup className="mb-3 d-flex flex-column justify-content-center">
      {filterOptions.map((option) => (
        <>
          <p></p>
          {(!option.roleNeeded || role === option.roleNeeded) && (
            <ToggleButton
              key={option.value}
              id={`filter-${option.value}`}
              type="radio"
              name="filter-options"
              variant={option.variant}
              onChange={() => handleBackUpChange(option.value)}
            >
              {option.label}
            </ToggleButton>
          )}
        </>
      ))}
    </ButtonGroup>
  );
};

export default ButtonsArchive;