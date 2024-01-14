import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import fetchAlerts from '../../Services/alertService';

import { useGlobalState } from '../../hooks';

const filterOptions = [
  { label: 'get alerts', value: '' },
  { label: 'All', value: 'all' },
  { label: 'Low', value: 'low', variant: 'success' },
  { label: 'Medium', value: 'medium', variant: 'warning' },
  { label: 'High', value: 'high', variant: 'danger' }
];

function FilterButton({ label, value, variant, onClick }) {
  return (
    <Button onClick={() => onClick(value)} variant={variant} className="me-2">
      {label}
    </Button>
  );
}

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
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-9">
          <div className="card bg-dark shadow-2-strong">
            <div className="card-body">
                <div className="mb-1">
                  {filterOptions.map((option) => (
                    <FilterButton
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      variant={option.variant}
                      onClick={handleFilterChange}
                    />
                  ))}
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    className="w-auto d-inline-block"
                    onChange={handleSearch}
                    value={searchTerm}
                  />
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertTable;