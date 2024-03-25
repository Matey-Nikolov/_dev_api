import React, { useState, useEffect, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';

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

  const { loading, informationForClients, setCurrentClient_id, setCurrentClient_role, setCurrentClient_name } = useContext(UseCreatedContex);

  const[useClientsInformation, setClientsInformation] = useState([]);

  const getInfomation = () => {
    if (!loading) {
      setClientsInformation(informationForClients);
    };
  };
  
  useEffect(() => {
    getInfomation();
  }, [loading, informationForClients]); 

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

      {useClientsInformation == [] && (

        <p>Customers </p>

      )}

      <Table striped bordered hover className="my-cool-table">
        <thead>
          <tr>
            <th rowSpan="2">Clients names</th>
            <th className='text-center' rowSpan="2">Access</th>
            <th className='text-center' colSpan="3">Alerts</th>
            <th className='text-center' colSpan="2">Endpoints</th>
          </tr>
          <tr>
            <th className='text-center'><span className="badge bg-danger">High</span></th>
            <th className='text-center'><span className="badge bg-warning">Medium</span></th>
            <th className='text-center'><span className="badge bg-success">Low</span></th>
            <th className='text-center'>Computer</th>
            <th className='text-center'>Server</th>
          </tr>
        </thead>
          <tbody>
            {useClientsInformation.map((client) => (
              <tr key={client.id}>
                {client.unauthorized ? (
                  <td colSpan="7" className='text-center'>
                    Unauthorized user: {client.clientName}
                  </td>
                ) : (
                  <>
                    <td className='text-left'>
                      <button onClick={() => handleClickedClientName(client)}>
                        {client.clientName}
                      </button>
                    </td>
    
                    {client.role === roleFromEnv ? (
                      <td className='text-center'>Full</td>
                    ) : (
                      <td className='text-center'>Limited</td>
                    )}
        
                    <td className='text-center'>{getAlertsCount(client.alerts.items, 'high')}</td>
                    <td className='text-center'>{getAlertsCount(client.alerts.items, 'medium')}</td>
                    <td className='text-center'>{getAlertsCount(client.alerts.items, 'low')}</td>
                    <td className='text-center'>{getEndpointsCount(client.endpoints, 'computer')}</td>
                    <td className='text-center'>{getEndpointsCount(client.endpoints, 'server')}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
      </Table>
    </Container>
  );
};

export default HomePage;