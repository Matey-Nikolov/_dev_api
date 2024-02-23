import React, { useState, useEffect, useMemo } from 'react';

import { Table } from 'react-bootstrap';

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
  } = usePagination();

  const currentItems = getPaginatedItems(detailsHealth);

  const endpointDetails = useMemo(() => endpointDetailsMap[machine_Id], [endpointDetailsMap, machine_Id]);

  if (endpointDetails) {

    return (
      <div className="container text-center mt-4">
        <h2 className="font-weight-light text-light">{endpointDetails.hostname}</h2>
        <button onClick={onBackClick} className="btn btn-secondary mb-3">Back to all endpoints</button>
        <div className="row">

          <div className="col-md-6 mb-4">
            <div className="card bg-secondary shadow-2-strong">
              <div className="card-body">
                <div className="table-responsive">
                  <h4 className="font-weight-light text-light">Assigned products</h4>
                  <Table striped bordered responsive>
                    <thead>
                      <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Status</th>
                        <th scope="col">Version</th>
                      </tr>
                    </thead>
                    <tbody id="table-body">
                      {assignedProducts == [] ? (
                        <tr>
                          <td colSpan="3" className="text-center">No information</td>
                        </tr>
                      ) : (
                        assignedProducts.map((products) => (
                          <tr key={products.code}>
                            <td>{products.code}</td>
                            <td>{products.status}</td>
                            <td>{products.version}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card bg-secondary shadow-2-strong">
              <div className="card-body">
                <div className="table-responsive">
                  <h4 className="font-weight-light text-light">Os</h4>
                  <Table striped bordered responsive>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Platform</th>
                        <th scope="col">Build</th>
                      </tr>
                    </thead>
                    <tbody id="table-body">
                      {details_OS.map((detailsOs) => (
                        <tr key={detailsOs.code}>
                          <td>{detailsOs.name}</td>
                          <td>{detailsOs.platform}</td>
                          <td>{detailsOs.build === undefined ? <p>no information</p> : <p>{detailsOs.build}</p>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card bg-secondary shadow-2-strong">
              <div className="card-body">
                <div className="table-responsive">
                  <h4 className="font-weight-light text-light">Health check</h4>
                  <Table striped bordered responsive>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody id="table-body">
                      {currentItems == []  ? (
                        <tr>
                          <td colSpan="3" className="text-center">No information</td>
                        </tr>
                      ) : (
                        currentItems.map((health) => (
                          <tr key={health.code}>
                            <td>{health.name}</td>
                            <td>{health.status}</td>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
  } else {
    return <h2>get data</h2>;
  }
};

export default EndpointDetails;