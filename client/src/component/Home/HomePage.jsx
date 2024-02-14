import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import ButtonsArchive from './ButtonsBackup';
import findByBackupButton from '../../Services/backupService';

import { countAlerts } from '../../Services/alertService';
import { hasEvents } from '../../Services/eventsService';

import secureStorage from 'react-secure-storage';
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();

  const [useSuccessBackup, setSuccessBackup] = useState(false);
  const [useErrorBackup, setErrorBackup] = useState(false);

  const [useFileName, setFileName] = useState('');

  const [useCounters, setCounters] = useState({ low: 0, medium: 0, high: 0 });

  const [useEvents, setEvents] = useState([]);

  const fetchData = useMemo(() => async () => {
    const data = await countAlerts();
    setCounters(data);

    const event = await hasEvents();

    setEvents(event);

  }, []);

  useEffect(() => {
    fetchData();
    
  }, [fetchData]);

  const handleBackUpChange = async (value) => {
    const statusAndFileName = await findByBackupButton(value);

    isBackup(statusAndFileName);
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

  return (
    <Container fluid className="px-4">
      <Row className="justify-content-center">
        <Col lg={3}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Counter alerts</h3>
              
              <span className="badge bg-success" onClick={() => navigate('/alerts')}>
                <h5 className="text-center font-weight-light my-1">
                  Low - {useCounters.low}
                </h5>
              </span>

              <span className="badge bg-warning">
                <h5 className="text-center font-weight-light my-1" onClick={() => navigate('/alerts')}>
                  Medium - {useCounters.medium}
                </h5>
              </span>
              
              <span className="badge bg-danger">
                <h5 className="text-center font-weight-light my-1" onClick={() => navigate('/alerts')}>
                  High - {useCounters.high}
                </h5>
              </span>

            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">From past 24 h</h3>
              <h5 className="text-center font-weight-light my-4">
                { useEvents === -1  ?
                  (
                    <p>No events.</p>
                  ) : 
                  ( 
                    <p>New events - {useEvents} </p>
                  )
                }
              </h5>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Welcome to API center</h3>
              <h5 className="text-center font-weight-light my-4">
                <ButtonsArchive
                  handleBackUpChange={handleBackUpChange}
                />
              </h5>

              {useSuccessBackup && (
                <Alert variant="info" onClose={() => setSuccessBackup(false)} dismissible>
                  Backup {useFileName} successfully!
                </Alert>
              )}

              {useErrorBackup && (
                <Alert variant="danger" onClose={() => setErrorBackup(false)} dismissible>
                  Back up error!
                </Alert>
              )}

            </div>
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default HomePage;