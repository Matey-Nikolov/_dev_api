import React, { useState, useEffect, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';

import { UseCreatedContex } from '../../contex/setupInformation';

import LoadingScreen from './LoadingScreen';

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const { loading, informationForClients, setCurrentClient_id, setCurrentClient_role, setCurrentClient_name } = useContext(UseCreatedContex);

  const[useClientsInformation, setClientsInformation] = useState([]);

  const getInfomation = () => {
    if (!loading) {
      setClientsInformation(informationForClients);
    };

  };
  
  useEffect(() => {
    getInfomation();
  }); 

  const handleClickedClientName = (value) => {
    setCurrentClient_id(value.uniqueId);
    setCurrentClient_role(value.role);
    setCurrentClient_name(value.clientName);

    navigate(`/endpoints/${value.clientName}`);
  };

  if (loading) {
    return <LoadingScreen/>
  }

  return (
    <Container>
      <h1 className="text-center my-4">🚀 Customers Dashboard 🚀</h1>
      <Table striped bordered hover className="my-cool-table">
          <thead>
              <tr>
                  <th rowSpan="2">Client name</th>
                  <th colSpan="3">Alerts</th>
                  <th colSpan="2">Endpoints</th>
              </tr>
              <tr>
                  <th><span className="badge bg-danger">High</span></th>
                  <th><span className="badge bg-warning">Medium</span></th>
                  <th><span className="badge bg-success">Low</span></th>
                  <th>Computer</th>
                  <th>Server</th>
              </tr>
          </thead>
          <tbody>
              {useClientsInformation.map((client) => (
                  <tr key={client.id}>
                      <td>
                        <button onClick={() => handleClickedClientName(client)}>
                          {client.clientName}
                        </button>
                      </td>
                      <td>{client.alerts.items.filter(x => x.severity === 'high').length}</td>
                      <td>{client.alerts.items.filter(x => x.severity === 'medium').length}</td>
                      <td>{client.alerts.items.filter(x => x.severity === 'low').length}</td>
                      <td>{client.endpoints.filter(x => x.type === 'computer').length}</td>
                      <td>{client.endpoints.filter(x => x.type === 'server').length}</td>
                  </tr>
              ))}
          </tbody>
      </Table>
    </Container>
  );
};

export default HomePage;