import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Container, Table, Button, Alert, Form, Row, Col } from 'react-bootstrap';

import { findClientById } from '../../Services/clientServiceFolder/clientSevice';

import { postEndpointScan, postUpdateRequest, searchEndpoints } from '../../Services/endpointsService';
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
  const [searchTerm, setSearchTerm] = useState('');

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
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredEndpoints = useMemo(() => {
    return endpoints.filter((value) => {
      if (filterType === 'all') {
        return true;
      };

      return value.type === filterType;
    });

  }, [endpoints, filterType]);


  const filteredData = useMemo(() => {
    return searchEndpoints(filteredEndpoints, searchTerm);
  }, [filteredEndpoints, searchTerm]);

  const handleMarkAllScan = () => {
    if (selectedScanEndpoints.size === filteredData.length) {
      setSelectedScanEndpoints(new Set());
    } else {
      const updatedSelectedScanEndpoints = new Set(filteredData.map(item => item.id));

      setSelectedScanEndpoints(updatedSelectedScanEndpoints);
    };
  };

  const handleMarkAllUpdate = () => {
    if (selectedUpdateEndpoints.size === filteredData.length) {
      setSelectedUpdateEndpoints(new Set());
    } else {
      const updatedSelectedUpdateEndpoints = new Set(filteredData.map(item => item.id));

      setSelectedUpdateEndpoints(updatedSelectedUpdateEndpoints);
    };
  };
  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    getPaginatedItems,
  } = usePagination();

  const currentItems = getPaginatedItems(filteredData);

  return (
    <Container className="mt-5">

      <Row className="mb-4">
        <Col md={12}>
          <FilterButtons
            filterType={filterType}
            handleFilterChange={handleFilterChange}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="text"
            placeholder="Search..."
            className="w-100"
            onChange={handleSearch}
            value={searchTerm}
          />
        </Col>

        {useRole === 'R/W' && (
          <>
            <Col md={2}>
              <Button variant="info" onClick={handleMarkAllScan}>
                Mark All for Scan
              </Button>
            </Col>
            <Col md={2}>
              <Button variant="info" onClick={handleMarkAllUpdate}>
                Mark All for Update
              </Button>
            </Col>
          </>
        )}

        <Col md={5}>
          {successAlert && (
            <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
              {successAlertText} is requested successfully!
            </Alert>
          )}
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='text-center'>Name machine</th>
            <th className='text-center'>Os</th>
            <th className='text-center'>Type</th>
            <th className='text-center'>Health</th>
            <th className='text-center'>Status</th>
            <th className='text-center'>LastSeenAt</th>
            <th className='text-center'>Tamper protection status</th>
            <th></th>
              {useRole === 'R/W' && (
                <th className='text-center'>
                  <Button
                    variant="info"
                    className="mt-3"
                    disabled={selectedScanEndpoints.size === 0}
                    onClick={() => handleButtonClickSendScanRequest([...selectedScanEndpoints])}
                  >
                    Scan
                  </Button>
                </th>
              )}
              {useRole === 'R/W' && (
                <th className='text-center'>
                  <Button
                    variant="info"
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
              <td className='text-left'>{value.hostname}</td>
              <td className='text-center'>{value.os.platform}</td>
              <td className='text-center'>{value.type}</td>
              <td className='text-center'>{value.health.overall}</td>
              <td className='text-center'>{value.health.services.status}</td>
              <td className='text-center'>{value.lastSeenAt}</td>
              <td className='text-center'>{value.tamperProtectionEnabled ? 
                (
                  <span className="badge bg-success">On</span>
                )
                : 
                (
                  <span className="badge bg-danger">Off</span>
                )}
              </td>
              <td className='text-center'>
                <Button onClick={() => handleButtonClickShowDetails(value.id)} variant="info">
                  Details
                </Button>
              </td>
                {useRole === 'R/W' && (
                  <td className='text-center'>
                    <Form.Check
                      onChange={() => handleCheckboxScanChange(value.id)}
                      type="checkbox"
                      checked={selectedScanEndpoints.has(value.id)}
                    />
                  </td>
                )}
                {useRole === 'R/W' && (
                  <td className='text-center'>
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
          totalItems={filteredData.length}
          setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default EndpointTablePage;