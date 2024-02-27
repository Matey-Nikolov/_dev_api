import React, { useState, useEffect, useMemo } from 'react';

import { Table, Card, Row, Col, Container, Button } from 'react-bootstrap';

import { fetchEndpointDetails } from '../../Services/endpointsService';

import Pagination from '../Table/Pagination';
import usePagination from '../../Services/Table/PaginationLogic';

const EndpointDetails = ({ machine_Id, clientId, onBackClick  }) => {
  const setMachineId = new Set();

  const [endpointDetailsMap, setEndpointDetailsMap] = useState({});
  const [assignedProducts, setAssignedProducts] = useState([]);
  const [details_OS, setDetailsOS] = useState([]);
  const [detailsHealth, setDetailsHealth] = useState([]);

  const fetchData = async () => {
    try {
      const endpointData = await fetchEndpointDetails(machine_Id, clientId);

      setEndpointDetailsMap((prevDetails) => ({
        ...prevDetails,
        [machine_Id]: endpointData,
      }));

      setAssignedProducts(endpointData.assignedProducts || []);

      setDetailsOS([endpointData.os] || []);
      setDetailsHealth(endpointData.health.services.serviceDetails || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (!setMachineId.has(machine_Id)) {
      fetchData();

      setMachineId.add(machine_Id);
    }
  }, [machine_Id]);

  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    getPaginatedItems,
  } = usePagination(1, 5);

  const currentItems = getPaginatedItems(detailsHealth);

  const endpointDetails = useMemo(() => endpointDetailsMap[machine_Id], [endpointDetailsMap, machine_Id]);

  if (endpointDetails) {

    return (
      <Container>
        <Row className="pt-3">
          
          <Col md={4}>
            <h2 class="text-secondary-emphasis">{endpointDetails.hostname}</h2>
          </Col>

          <Col md={3}>
            <Button onClick={onBackClick} variant="secondary" className="mb-3">Back to endpoints</Button>
          </Col>

          <Col md={5}>
            <Card>
              <Card.Body>
                <h4 class="text-center text-secondary-emphasis">Os</h4>
                <Table striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th class="text-center">Platform</th>
                      <th class="text-center">Build</th>
                    </tr>
                  </thead>
                  <tbody id="table-body">
                    {details_OS.map((detailsOs) => (
                      <tr key={detailsOs.code}>
                        <td class="text-left">{detailsOs.name}</td>
                        <td class="text-center">{detailsOs.platform}</td>
                        <td class="text-center">{detailsOs.build === undefined ? <p>no information</p> : <p>{detailsOs.build}</p>}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="pt-3">            
          <Col>
            <Card>
              <Card.Body>
                <h4 class="text-center text-secondary-emphasis">Health check</h4>
                <Table striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th class="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody id="table-body">
                    {currentItems.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="text-center">No information</td>
                      </tr>
                    ) : (
                      currentItems.map((health) => (
                        <tr key={health.code}>
                          <td class="text-left">{health.name}</td>
                          <td class="text-center">{health.status}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>

                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={detailsHealth.length}
                  setCurrentPage={setCurrentPage}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={5}>
            <Card>
              <Card.Body>
                <h4 class="text-center text-secondary-emphasis">Assigned products</h4>
                <Table striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th class="text-center">Status</th>
                      <th class="text-center">Version</th>
                    </tr>
                  </thead>
                  <tbody id="table-body">
                    {assignedProducts.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center">No information</td>
                      </tr>
                    ) : (
                      assignedProducts.map((product) => (
                        <tr key={product.code}>
                          <td class="text-left">{product.code}</td>
                          <td class="text-center">{product.status}</td>
                          <td class="text-center">{product.version}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
    
  } else {
    return <h2>get data</h2>;
  }
};

export default EndpointDetails;