import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const ButtonsArchive = ({ handleBackUpChange, role }) => {
  const filterOptions = [
    { label: 'Allow items', value: 'allow items', section: '1' },
    { label: 'Block items', value: 'block items', section: '1' },
    { label: 'Policies', value: 'policies', section: '1'},
    { label: 'Scanning exclusions', value: 'scanning exclusions', section: '1'},

    { label: 'Installers download', roleNeeded: 'R/W', value: 'download', section: '2'},

    { label: 'Enviroment reset', value: 'reset', roleNeeded: 'R/W', variant: 'danger', section: '3'}
  ];

  return (
    <div>
      <h3>Backup</h3>

      <ButtonGroup className="mb-3 d-flex flex-column justify-content-center">
        {filterOptions.filter(option => option.section === '1').map((option) => (
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

      {(role !== 'R/O') && (
        <h4>Software download</h4>
      )}

      <ButtonGroup className="mb-3 d-flex flex-column justify-content-center">
        {filterOptions.filter(option => option.section === '2').map((option) => (
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

      {(role !== 'R/O') && (
        <h4>Management</h4>
      )}

      <ButtonGroup className="mb-3 d-flex flex-column justify-content-center">
        {filterOptions.filter(option => option.section === '3').map((option) => (
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
    </div>
  );
};

export default ButtonsArchive;