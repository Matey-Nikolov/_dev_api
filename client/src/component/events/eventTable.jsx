import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Card } from 'react-bootstrap';

import { useContext } from 'react';
import { UseCreatedContex } from '../../contex/setupInfamation';

const EventTable = () => {
  const { loading, useEvents } = useContext(UseCreatedContex);

  const filterRegex = /Event::([A-Za-z]+)::([A-Za-z]+)/;

  const [useAllEvents, setEvents] = useState([]);

  useEffect(() => {
    if (!loading) {
      setEvents(useEvents.items);
    };
  }, [useEvents]);
  
  if(useAllEvents != []){
    return(
      <Container fluid className="px-4">
        <Row className="justify-content-center">
          <Col lg={5}>
            <Card className="shadow-lg border-0 rounded-lg mt-5">
              <Card.Header>
                <h5 className="text-center font-weight-light my-4">
                  No events from past 24 h.
                </h5>
              </Card.Header>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return(
    <Container className="mt-5">
      <Table responsive bordered striped className="mt-2">
        <thead>
          <tr>
            <th scope="col">Messages</th>
            <th scope="col">Allow</th>
          </tr>
        </thead>
        <tbody>
          {useAllEvents.map((value) => (
            <tr key={value.name}>
              <td>{value.name}</td>
              <td>
                {filterRegex.test(value.type) && filterRegex.exec(value.type) [2] === 'WebControlViolation' ? (
                  <button
                    data-type={value.name}
                    className="btn btn-outline-success"
                  >
                    allow
                  </button>
                ) : (
                  null
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EventTable;