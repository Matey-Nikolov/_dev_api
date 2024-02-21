import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Table } from 'react-bootstrap';

import { findClientById } from '../../Services/clientServiceFolder/clientSevice';

import FilterButtons from './FilterButtonsAlerts'; 

import Pagination from '../Table/Pagination';
import usePagination from '../../Services/Table/PaginationLogic';

import { useContext } from 'react';
import { UseCreatedContex } from '../../contex/setupInformation';

function AlertTable() {

  const { currentClient_id } = useContext(UseCreatedContex);

  const [data, setData] = useState(null);
  const [filter, setFilter] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const client = findClientById(currentClient_id);
    
    if (client !== -1) {
      setData(client.alerts);
    };
  });

  const handleFilterChange = useCallback(
    (newFilter) => {
      setFilter(newFilter);
    },
    [setFilter]
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }

    let filteredItems;

    switch (filter) {
      case 'low':
      case 'medium':
      case 'high':
        filteredItems = data.items.filter((x) => x.severity === filter);
      break;
      default:
        filteredItems = data.items;
      break;
    };

    return filteredItems.filter(
      (value) =>
        value.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.severity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.raisedAt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm, filter]);

  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    getPaginatedItems,
  } = usePagination();

  const currentItems = getPaginatedItems(filteredData);

  if (data === null || data.items.length === 0) {
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
  }

  return (
    <Container className="mt-5">
      <FilterButtons
        filterType={filter}
        handleFilterChange={handleFilterChange}
      />

      <Form.Control
          type="text"
          placeholder="Search..."
          className="w-auto d-inline-block"
          onChange={handleSearch}
          value={searchTerm}
      />

      <Table id="alertTable" responsive bordered striped className="mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Severity</th>
            <th>Description</th>
            <th>RaisedAt</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{value.product}</td>
              <td>
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
              <td>{value.description}</td>
              <td>{value.raisedAt}</td>
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

export default AlertTable;