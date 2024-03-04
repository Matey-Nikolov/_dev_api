import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { Container, Row, Col, Card, Form, Table, Button, Alert } from 'react-bootstrap';

import FilterButtons from './FilterButtonsAlerts'; 
import AcknowledgeHelpModal from './HelpModal';

import Pagination from '../Table/Pagination';
import usePagination from '../../Services/Table/PaginationLogic';

import { UseCreatedContex } from '../../contex/setupInformation';

import { findClientAlerts, filterItems, searchItems, takeAction, updateAlertsForClient } from '../../Services/alertService';
import timeConverter from '../../Services/convertTime';

function AlertTable() {
  const { currentClient_id, currentClient_role } = useContext(UseCreatedContex);

  const [useRole, setRole] = useState();

  const [useAlerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const [showHelp, setShowHelp] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlertText, setSuccessAlertText] = useState('');


  const handleShowHelp = () => setShowHelp(true);
  const handleCloseHelp = () => setShowHelp(false);

  useEffect(() => {
    const alerts = findClientAlerts(currentClient_id);
    
    setAlerts(alerts);
    setRole(currentClient_role);
  }, [currentClient_role]);

  const handleButtonClickTakeAction = async (alertId, action) => {
    const isSuccess = await takeAction(currentClient_id, alertId, action);

    if (isSuccess === 'success') {
      setSuccessAlert(true);
      setSuccessAlertText('Acknowledge');

      const updateAlerts = updateAlertsForClient(useAlerts, alertId);

      setAlerts(updateAlerts);
    };
    
    setTimeout(() => {
      setSuccessAlert(false);
    }, 4000);
  };

  const handleFilterChange = useCallback(
    (newFilter) => {
      setFilter(newFilter);
      setCurrentPage(1);
    },
    [setFilter]
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    if (!useAlerts) {
      return [];
    };

    const filteredItems = filterItems(useAlerts, filter);

    return searchItems(filteredItems, searchTerm);

  }, [useAlerts, searchTerm, filter]);

  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    getPaginatedItems,
  } = usePagination();

  const currentItems = getPaginatedItems(filteredData);

  if (!useAlerts || useAlerts.length === 0) {
    return(
      <Container fluid className="px-4">
        <Row className="justify-content-center">
          <Col lg={5}>
            <Card className="shadow-lg border-0 rounded-lg mt-5">
              <Card.Header>
                <h5 className="text-center font-weight-light my-4">
                  No alerts from past one week.
                </h5>
              </Card.Header>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h5>Filters by severity:</h5>
          <FilterButtons
            filterType={filter}
            handleFilterChange={handleFilterChange}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search..."
            className="w-100"
            onChange={handleSearch}
            value={searchTerm}
          />
        </Col>
        <Col md={2}>
          {useRole === 'R/W' && (
            <Button variant="info" onClick={handleShowHelp} className="w-100">
              Help
            </Button>
          )}
        </Col>        
        <Col md={5}>
          {successAlert && (
            <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
              {successAlertText} action is requested successfully!
            </Alert>
          )}
        </Col>
      </Row>

      <Table id="alertTable" responsive bordered striped className="mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Severity</th>
            <th>Description</th>
            <th>RaisedAt</th>
            {useRole === 'R/W' && (
              <th>allowed actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td className='text-left'>{value.product}</td>

              <td className='text-center'>
                {value.severity === 'low' ? (
                  <span className="badge bg-success">low</span>
                ) : value.severity === 'medium' ? (
                  <span className="badge bg-warning">medium</span>
                ) : value.severity === 'high' ? (
                  <span className="badge bg-danger">high</span>
                ) : (
                  ''
                )}
              </td>

              <td className='text-left'>{value.description}</td>

              <td className='text-center'>{timeConverter(value.raisedAt)}</td>

              {useRole === 'R/W' && (
                <td className='text-center'>
                  <Button variant="info" onClick={() => handleButtonClickTakeAction(value.id, value.allowedActions[0])}>
                    {value.allowedActions[0]}
                  </Button>
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

      <AcknowledgeHelpModal show={showHelp} handleClose={handleCloseHelp} />
    </Container>
  );
};

export default AlertTable;