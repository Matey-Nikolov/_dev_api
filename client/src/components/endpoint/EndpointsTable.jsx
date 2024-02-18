import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Form } from 'react-bootstrap';

import { fetchEndpointScan } from '../../Services/endpointsService';
import FilterButtons from './filterEndpointsButtons';

import { useLocation } from 'react-router-dom';

import { useContext } from 'react';
import { UseCreatedContex } from '../../contex/setupInformation';

const EndpointTablePage = ({ onEndpointDetailsClick }) => {
  const location = useLocation();
  const passedData = location.state;
  
  const { loading, useEndpoints } = useContext(UseCreatedContex);

  const [endpoints, setEndpoints] = useState([]);

  const [successAlert, setSuccessAlert] = useState(false);

  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  const [selectedEndpoints, setSelectedEndpoints] = useState(new Set());

  useEffect(() => {
    if (passedData !== null) {
        setEndpoints([...passedData.key1]);
    }
    else{
      if (!loading) {
        setEndpoints(useEndpoints);
      };
    };

  }, [useEndpoints]);

  //machine_Id or endpointId
  const handleButtonClickShowDetails = (machine_Id) => {
    onEndpointDetailsClick(machine_Id);
  };

  const handleCheckboxChange = (id) => {
    const updatedSelectedEndpoints = new Set(selectedEndpoints);

    if (!selectedEndpoints.has(id)) {
      updatedSelectedEndpoints.add(id);
    }

    setSelectedEndpoints(updatedSelectedEndpoints);
  };

  const handleButtonClickSendScanRequest = async (ids) => {
    try {

      await Promise.all(ids.map(async (id) => {
        await fetchEndpointScan(id);
      }));

      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 4000);
    } catch (error) {
      console.error('Error initiating scan requests:', error);
    }
  };
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredEndpoints = endpoints.filter((value) => {
    //console.log(endpoints);
    if (filterType === 'all') {
      return true;
    }
    return value.type === filterType;
  });

  const sortedEndpoints = filteredEndpoints.sort((a, b) => {
    const dateA = new Date(a.lastSeenAt);
    const dateB = new Date(b.lastSeenAt);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <Container className="mt-5">
      <FilterButtons
        filterType={filterType}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
        sortOrder={sortOrder}
      />
      {successAlert && (
        <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
          Scan is requested successfully!
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name machine</th>
            <th>Type</th>
            <th>Health</th>
            <th>Status</th>
            <th>LastSeenAt</th>
            <th></th>
            <th>
              <Button
                variant="primary"
                className="mt-3"
                disabled={selectedEndpoints.size === 0}
                onClick={() => handleButtonClickSendScanRequest([...selectedEndpoints])}
              >
                Scan
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEndpoints.map((value) => (
            <tr key={value.id}>
              <td>{value.associatedPerson.name}</td>
              <td>{value.type}</td>
              <td>{value.health.overall}</td>
              <td>{value.health.services.status}</td>
              <td>{value.lastSeenAt}</td>
              <td>
                <Button onClick={() => handleButtonClickShowDetails(value.id)} variant="info">
                  Show Details
                </Button>
              </td>
              <td>
                <Form.Check
                  onChange={() => handleCheckboxChange(value.id)}
                  type="checkbox"
                  checked={selectedEndpoints.has(value.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );

};

export default EndpointTablePage;