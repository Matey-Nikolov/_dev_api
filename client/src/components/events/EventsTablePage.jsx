import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Card, Button } from 'react-bootstrap';

import { findClientById } from '../../Services/clientServiceFolder/clientSevice';

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

  useEffect(() => {
    const client = findClientById(currentClient_id);

    if (client !== -1) {
      setEvents(client.events);
    };
  });

  const handleClickedAllow = async (value) => {
    const isAddWebsite = await allowWebsiteEvents.btnAllowWebsite(value.name);

    console.log(isAddWebsite);
  };
  

  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    getPaginatedItems,
  } = usePagination(1, 10);

  const currentItemsEvents = getPaginatedItems(useAllEvents);
  
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
    <Container className="mt-5">
      <Table responsive bordered striped className="mt-2">
        <thead>
          <tr>
            <th scope="col">Messages</th>
            <th className="text-center" scope="col">Allow</th>
          </tr>
        </thead>
        <tbody>
          {currentItemsEvents.map((value) => (
            <tr key={value.id}>
              <td>{value.name}</td>
              <td className="text-center">
                {filterRegex.test(value.type) && filterRegex.exec(value.type) [2] === 'WebControlViolation' ? (
                  <Button
                    data-type={value.name}
                    className="btn btn-outline-success"
                    onClick={() => handleClickedAllow(value)}
                  >
                    allow
                  </Button>
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
        totalItems={useAllEvents.length}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default EventTable;