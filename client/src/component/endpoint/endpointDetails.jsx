import React, { useState, useEffect, useMemo } from 'react';
import { Table } from 'react-bootstrap';

import { fetchEndpointDetails } from '../../Services/endpointsService';
import { useGlobalState } from '../../hooks';

const EndpointDetails = ({ machine_Id, onBackClick  }) => {
  const setMachineId = new Set();

  const [tenetId] = useGlobalState('tenetId');
  const [tokenTenat] = useGlobalState('tokenTenat');
  const [useDataGetEndpoints] = useState({ tenetId, tokenTenat });

  const [endpointDetailsMap, setEndpointDetailsMap] = useState({});
  const [assignedProducts, setAssignedProducts] = useState([]);
  const [details_OS, setDetailsOS] = useState([]);
  const [detailsHealth, setDetailsHealth] = useState([]);

  const fetchData = async () => {
    try {
      const endpointData = await fetchEndpointDetails(useDataGetEndpoints, machine_Id);

      console.log(endpointData);

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
  }, [machine_Id, useDataGetEndpoints]);

  const endpointDetails = useMemo(() => endpointDetailsMap[machine_Id], [endpointDetailsMap, machine_Id]);

  if (endpointDetails) {

    return (
      <div className="container text-center mt-4">
        <h2 className="font-weight-light text-light">{endpointDetails.hostname}</h2>
        <button onClick={onBackClick} className="btn btn-secondary mb-3">Back to all endpoints</button>
        <div className="row">
          {/* Table 1 (Top Left) */}
          <div className="col-md-6 mb-4">
            <div className="card bg-dark shadow-2-strong">
              <div className="card-body">
                <div className="table-responsive">
                  <h4 className="font-weight-light text-light">Assigned products</h4>
                  <Table striped bordered responsive className="table table-dark table-borderless mb-0">
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
  
          {/* Table 2 (Top Right) */}
          <div className="col-md-6 mb-4">
            <div className="card bg-dark shadow-2-strong">
              <div className="card-body">
                <div className="table-responsive">
                  <h4 className="font-weight-light text-light">Os</h4>
                  <Table striped bordered responsive className="table table-dark table-borderless mb-0">
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
  
          {/* Table 3 (Bottom Left) */}
          <div className="col-md-12">
            <div className="card bg-dark shadow-2-strong">
              <div className="card-body">
                <div className="table-responsive">
                  <h4 className="font-weight-light text-light">Health check</h4>
                  <Table striped bordered responsive className="table table-dark table-borderless mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody id="table-body">
                      {detailsHealth == []  ? (
                        <tr>
                          <td colSpan="3" className="text-center">No information</td>
                        </tr>
                      ) : (
                        detailsHealth.map((health) => (
                          <tr key={health.code}>
                            <td>{health.name}</td>
                            <td>{health.status}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
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