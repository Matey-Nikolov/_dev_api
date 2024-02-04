import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { countAlerts } from '../../Services/alertService';

import secureStorage from 'react-secure-storage';
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();


  const tenetId = secureStorage.getItem('tenetId');
  const tokenTenat = secureStorage.getItem('tokenTenat');
  const [useDataGetAlerts] = useState({ tenetId, tokenTenat });

  const [counters, setCounters] = useState({ low: 0, medium: 0, high: 0 });

  const fetchData = useMemo(() => async () => {
    const data = await countAlerts(useDataGetAlerts);
    setCounters(data);
  }, [useDataGetAlerts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container fluid className="px-4">
      <Row className="justify-content-center">
        <Col lg={3}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Counter alerts</h3>
              
              <span className="badge bg-success" onClick={() => navigate('/alerts')}>
                <h5 className="text-center font-weight-light my-1">
                  Low - {counters.low}
                </h5>
              </span>

              <span className="badge bg-warning">
                <h5 className="text-center font-weight-light my-1" onClick={() => navigate('/alerts')}>
                  Medium - {counters.medium}
                </h5>
              </span>
              
              <span className="badge bg-danger">
                <h5 className="text-center font-weight-light my-1" onClick={() => navigate('/alerts')}>
                  High - {counters.high}
                </h5>
              </span>

            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Welcome to API center</h3>
              <h5 className="text-center font-weight-light my-4">
                Hello world
              </h5>
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Welcome to API center</h3>
              <h5 className="text-center font-weight-light my-4">
                Hello world
              </h5>
            </div>
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default HomePage;