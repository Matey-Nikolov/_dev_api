import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Table } from 'react-bootstrap';

import ViewButtons from './ButtonsView';

import { useContext } from 'react';
import { UseCreatedContex } from '../../contex/setupInformation';

import LoadingScreen from './LoadingScreen';

import ButtonsArchive from './ButtonsBackup';
import findByBackupButton from '../../Services/backupService';

import { countAlerts } from '../../Services/alertService';
import { hasEvents } from '../../Services/eventsService';

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const { loading, informationForClients } = useContext(UseCreatedContex);

  const [useSuccessBackup, setSuccessBackup] = useState(false);
  const [useErrorBackup, setErrorBackup] = useState(false);

  const [useFileName, setFileName] = useState('');

  const [useCounters, setCounters] = useState({ low: 0, medium: 0, high: 0 });

  const [useCountEvents, setCountEvents] = useState([]);

  const[useClientsInformation, setClientsInformation] = useState([]);

  const getInfomation = () => {
    if (!loading) {
      setClientsInformation(informationForClients);
    };

  };
  
  useEffect(() => {
    getInfomation();
  }, [informationForClients]); 


  const handleBackUpChange = async (value) => {
    const statusAndFileName = await findByBackupButton(value);

    isBackup(statusAndFileName);
  };

  const handleClickedClientName = (value) => {
    navigate(
      '/endpoints',
      {
        state: {
          'info': value
        }
      }
    );
  };

  const isBackup = (statusAndFileName) => {
    setSuccessBackup(statusAndFileName.status === 201);
    setErrorBackup(!statusAndFileName || statusAndFileName.status === 500);

    if (statusAndFileName.status === 201) {
      setFileName(statusAndFileName.fileName);
    }

    setTimeout(() => {
      setSuccessBackup(false);
      setErrorBackup(false);
    }, 4000);
  };

  if (loading) {
    return <LoadingScreen/>
  }

  return (
    <Container fluid className="px-4 d-flex justify-content-center">
      <h1 className="text-center my-4">🚀 Customers Dashboard 🚀</h1>
      <Table striped bordered hover className="my-cool-table">
          <thead>
              <tr>
                  <th rowSpan="2">Client name</th>
                  <th colSpan="3">Alerts</th>
                  <th colSpan="2">Endpoints</th>
              </tr>
              <tr>
                  <th>High</th>
                  <th>Medium</th>
                  <th>Low</th>
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