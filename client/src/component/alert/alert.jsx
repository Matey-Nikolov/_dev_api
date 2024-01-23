import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

import fetchAlerts from '../../Services/alertService';
import FilterButtons from './FilterButtonsAlerts'; 

import { useGlobalState } from '../../hooks';

function AlertTable() {
  const [tenetId] = useGlobalState('tenetId');
  const [tokenTenat] = useGlobalState('tokenTenat');
  const [useDataGetAlerts] = useState({ tenetId, tokenTenat });
  
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchData = useCallback(async () => {
    await fetchAlerts(filter, useDataGetAlerts, setData, setFilter);
  }, [filter, useDataGetAlerts]);

  const handleFilterChange = useCallback(
    (newFilter) => {
      setFilter(newFilter);
    },
    [setFilter]
  );

  useEffect(() => {
    useDataGetAlerts.tenetId = tenetId;
    useDataGetAlerts.tokenTenat = tokenTenat;
    fetchData();

    return () => {
      setData(null);
    };
  }, [tenetId, tokenTenat, fetchData, useDataGetAlerts]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }

    let filteredItems;

    switch (filter) {
      case 'all':
        filteredItems = data.items;
      break;
      case 'low':
      case 'medium':
      case 'high':
        filteredItems = data.items.filter((x) => x.severity === filter);
        break;
      default:
        filteredItems = data.items;
        break;
    }

    return filteredItems.filter(
      (value) =>
        value.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.severity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.raisedAt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm, filter]);

  if (!data) {
    return(
      <>
        <div className="container-fluid px-4">
          <div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h5 className="text-center font-weight-light my-4">
                        Loading alerts from database.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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

      <Table responsive bordered striped className="mt-2">
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
          {filteredData.map((value, index) => (
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
    </Container>

  );
}

export default AlertTable;