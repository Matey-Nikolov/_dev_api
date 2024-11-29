import React, { useState, useEffect, useMemo } from 'react';
import { Table, Container, Row, Col, Card, Button } from 'react-bootstrap';

import timeConverter from '../../Services/convertTime';

import { updateEventsForClient, fetchEvents } from '../../Services/eventsService';

import { useContext } from 'react';
import { UseCreatedContex } from '../../contex/setupInformation';

import Pagination from '../Table/Pagination';
import usePagination from '../../Services/Table/PaginationLogic';

import getWebsiteServiceInstance from '../../Services/websiteService';

const EventTable = () => {
  const { currentClient_id } = useContext(UseCreatedContex);

  const allowWebsiteEvents = new getWebsiteServiceInstance(currentClient_id);

  const filterRegex = /Event::([A-Za-z]+)::([A-Za-z]+)/;

  const [useAllEvents, setEvents] = useState([]);

  const [showWebControlViolation, setShowWebControlViolation] = useState(false);
  const [buttonColor, setButtonColor] = useState('secondary');

  useEffect(() => {
    async function fetchData() {
      const events = await fetchEvents(currentClient_id);
      setEvents(events);
    };

    fetchData();
  }, [currentClient_id]);

  const handleClickedAllow = async (value) => {
    const isAddWebsite = await allowWebsiteEvents.btnAllowWebsite(value.name);

    console.log(isAddWebsite);

    const updateEvents = updateEventsForClient(useAllEvents, value.id);
    setEvents(updateEvents);
  };
  
  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    getPaginatedItems,
  } = usePagination(1, 6);

  const filteredDataEvents = useMemo(() => {
    if (!useAllEvents) {
      return [];
    };
  
    if (showWebControlViolation) {
      setCurrentPage(1);

      return useAllEvents.filter(value => filterRegex.test(value.type) && filterRegex.exec(value.type)[2] === 'WebControlViolation');
    } else {
      setCurrentPage(1);
      return useAllEvents;
    };
  
  }, [useAllEvents, showWebControlViolation]);

  const currentItemsEvents = getPaginatedItems(filteredDataEvents);
  
  if(useAllEvents == []){
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
    <Container className="mt-7 pt-5">
      <Button
        className={`mb-3 info ${buttonColor}`}
        variant={buttonColor}
        onClick={() => {
          setShowWebControlViolation(!showWebControlViolation);
          setButtonColor(buttonColor === 'secondary' ? 'primary' : 'secondary');
        }}
      >
        filter by web events
      </Button>

      <Table responsive bordered striped className="mt-2">
        <thead>
          <tr>
            <th>Type</th>
            <th>Severity</th>
            <th scope="col">Events for last 24 hours</th>
            <th className="text-center" scope="col">When</th>
            <th className="text-center" scope="col">Allow wibsite</th>
          </tr>
        </thead>
        <tbody>
          {currentItemsEvents.map((value) => (
            <tr key={value.id}>
              <td className='text-left'>{value.type}</td>

              <td className='text-center'>
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

              <td className='text-left'>{value.name}</td>

              <td className='text-center'>{timeConverter(value.when)}</td>

              <td className="text-center">
                {filterRegex.test(value.type) && filterRegex.exec(value.type) [2] === 'WebControlViolation' ? (
                  <button
                    data-type={value.name}
                    className="btn btn-outline-success"
                    onClick={() => handleClickedAllow(value)}
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

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredDataEvents.length}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default EventTable;