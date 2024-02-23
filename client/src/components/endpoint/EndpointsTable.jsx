import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Button, Alert, Form } from 'react-bootstrap';

import { findClientById } from '../../Services/clientServiceFolder/clientSevice';

import { postEndpointScan, postUpdateRequest } from '../../Services/endpointsService';
import FilterButtons from './filterEndpointsButtons';

import { UseCreatedContex } from '../../contex/setupInformation';
import Pagination from '../Table/Pagination';
import usePagination from '../../Services/Table/PaginationLogic';

const EndpointTablePage = ({ onEndpointDetailsClick }) => {
  const { currentClient_id } = useContext(UseCreatedContex);
 
  const [endpoints, setEndpoints] = useState([]);

  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlertText, setSuccessAlertText] = useState('');

  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  const [selectedScanEndpoints, setSelectedScanEndpoints] = useState(new Set());
  const [selectedUpdateEndpoints, setSelectedUpdateEndpoints] = useState(new Set());
  
  const [useRole, setRole] = useState();

  useEffect(() => {
    const client = findClientById(currentClient_id);
    
    if (client !== -1) {
      setEndpoints(client.endpoints);
      setRole(client.role);
    };
  });

  const handleButtonClickShowDetails = (machine_Id) => {
    onEndpointDetailsClick(machine_Id, currentClient_id);
  };

  const handleCheckboxScanChange = (id) => {
    const updatedSelectedScanEndpoints = new Set(selectedScanEndpoints);
  
    if (!selectedScanEndpoints.has(id)) {
      updatedSelectedScanEndpoints.add(id);
    } else {
      updatedSelectedScanEndpoints.delete(id);
    }
  
    setSelectedScanEndpoints(updatedSelectedScanEndpoints);
  };
  
  const handleCheckboxUpdateChange = (id) => {
    const updatedSelectedUpdateEndpoints = new Set(selectedUpdateEndpoints);
  
    if (!selectedUpdateEndpoints.has(id)) {
      updatedSelectedUpdateEndpoints.add(id);
    } else {
      updatedSelectedUpdateEndpoints.delete(id);
    }
  
    setSelectedUpdateEndpoints(updatedSelectedUpdateEndpoints);
  };

  const handleButtonClickSendScanRequest = async (ids) => {
    await Promise.all(ids.map(async (id) => {
      await postEndpointScan(id, currentClient_id);
    }));

    setSuccessAlert(true);
    setSuccessAlertText('Scan');

    selectedScanEndpoints.clear();

    setTimeout(() => {
      setSuccessAlert(false);
    }, 4000);
  };

  const handleButtonClickSendUpdateRequest = async (ids) => {

    await Promise.all(ids.map(async (id) => {
      await postUpdateRequest(id, currentClient_id);
    }));

    setSuccessAlert(true);
    setSuccessAlertText('Update');

    selectedUpdateEndpoints.clear();

    setTimeout(() => {
      setSuccessAlert(false);
    }, 4000);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredEndpoints = endpoints.filter((value) => {
    if (filterType === 'all') {
      return true;
    };

    return value.type === filterType;
  });

  const sortedEndpoints = filteredEndpoints.sort((a, b) => {
    const dateA = new Date(a.lastSeenAt);
    const dateB = new Date(b.lastSeenAt);

    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    getPaginatedItems,
  } = usePagination();

  const currentItems = getPaginatedItems(sortedEndpoints);

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
          {successAlertText} is requested successfully!
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
              {useRole === 'R/W' && (
                <th>
                  <Button
                    variant="primary"
                    className="mt-3"
                    disabled={selectedScanEndpoints.size === 0}
                    onClick={() => handleButtonClickSendScanRequest([...selectedScanEndpoints])}
                  >
                    Scan
                  </Button>
                </th>
              )}
              {useRole === 'R/W' && (
                <th>
                  <Button
                    variant="primary"
                    className="mt-3"
                    disabled={selectedUpdateEndpoints.size === 0}
                    onClick={() => handleButtonClickSendUpdateRequest([...selectedUpdateEndpoints])}
                  >
                    Update
                  </Button>
                </th>
              )}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((value) => (
            <tr key={value.id}>
              <td>{value.hostname}</td>
              <td>{value.type}</td>
              <td>{value.health.overall}</td>
              <td>{value.health.services.status}</td>
              <td>{value.lastSeenAt}</td>
              <td>
                <Button onClick={() => handleButtonClickShowDetails(value.id)} variant="info">
                  Show Details
                </Button>
              </td>
                {useRole === 'R/W' && (
                  <td>
                    <Form.Check
                      onChange={() => handleCheckboxScanChange(value.id)}
                      type="checkbox"
                      checked={selectedScanEndpoints.has(value.id)}
                    />
                  </td>
                )}
                {useRole === 'R/W' && (
                  <td>
                    <Form.Check
                      onChange={() => handleCheckboxUpdateChange(value.id)}
                      type="checkbox"
                      checked={selectedUpdateEndpoints.has(value.id)}
                    />
                  </td>
                )}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={sortedEndpoints.length}
          setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default EndpointTablePage;