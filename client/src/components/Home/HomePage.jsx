import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';

import { UseCreatedContex } from '../../contex/setupInformation';

import LoadingScreen from './LoadingScreen';

import { useNavigate } from "react-router-dom";

const getAlertsCount = (items, severity) => {
  return items.filter(x => x.severity === severity).length;
};

const getEndpointsCount = (items, type) => {
  return items.filter(x => x.type === type).length;
};

const HomePage = () => {
  const navigate = useNavigate();
  const roleFromEnv = process.env.REACT_APP_ROLE;

  const {
    loading,
    informationForClients,
    setCurrentClient_id,
    setCurrentClient_role,
    setCurrentClient_name,
  } = useContext(UseCreatedContex);

  const handleClickedClientName = (client) => {
    setCurrentClient_id(client.uniqueId);
    setCurrentClient_role(client.role);
    setCurrentClient_name(client.clientName);
    navigate(`/endpoints/${client.clientName}`);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <div className="dashboard-header text-center">
        <h1 className="my-4">🚀 Customers Dashboard 🚀</h1>
      </div>

      {informationForClients.length === 0 ? (
        <p>No customers available</p>
      ) : (
        <div className="table-container">
          <Table responsive bordered hover className="modern-table">
            <thead>
              <tr>
                <th>Clients Names</th>
                <th className="text-center">Access</th>
                <th className="text-center">Alerts - High</th>
                <th className="text-center">Alerts - Medium</th>
                <th className="text-center">Alerts - Low</th>
                <th className="text-center">Endpoints - Computer</th>
                <th className="text-center">Endpoints - Server</th>
              </tr>
            </thead>
            <tbody>
              {informationForClients.map((client) => (
                <tr key={client.uniqueId}>
                  {client.unauthorized ? (
                    <td colSpan="7" className="text-center unauthorized">
                      Unauthorized user: {client.clientName}
                    </td>
                  ) : (
                    <>
                      <td>
                        <button
                          className="client-button"
                          onClick={() => handleClickedClientName(client)}
                        >
                          {client.clientName}
                        </button>
                      </td>
                      <td className="text-center">
                        <Badge
                          bg={client.role === roleFromEnv ? "success" : "warning"}
                        >
                          {client.role === roleFromEnv ? "Full" : "Limited"}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <Badge bg="danger">
                          {getAlertsCount(client.alerts, "high")}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <Badge bg="warning">
                          {getAlertsCount(client.alerts, "medium")}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <Badge bg="success">
                          {getAlertsCount(client.alerts, "low")}
                        </Badge>
                      </td>
                      <td className="text-center">
                        {getEndpointsCount(client.endpoints, "computer")}
                      </td>
                      <td className="text-center">
                        {getEndpointsCount(client.endpoints, "server")}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default HomePage;