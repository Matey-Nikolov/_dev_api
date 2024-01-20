import React, { useState, useEffect, useMemo } from 'react';
import { Table, Button, Alert, Container } from 'react-bootstrap';

import WebsiteService from '../../Services/websiteService';

import { useGlobalState } from '../../hooks';



const WebsiteTable = () => {

  const [tenetId] = useGlobalState('tenetId');
  const [tokenTenat] = useGlobalState('tokenTenat');

  const websiteServiceInstance = new WebsiteService(tokenTenat, tenetId);

  const [useWebsites, setWebsites] = useState([]);

  const [successAlert, setSuccessAlert] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const websiteData = await websiteServiceInstance.allowWebsite();

        setWebsites([...websiteData]);
      } catch (error) {
        console.error('Error fetching websites:', error);
        throw error;
      }
    };

    fetchData();
  }, [setWebsites]);
   
  const memoizedWebsites = useMemo(() => useWebsites, [useWebsites]);

  async function handleButtonClickBlock(website_Id){
    const isDeleted = await websiteServiceInstance.btnBlockWebsite(website_Id);

    setWebsites((prevWebsites) => prevWebsites.filter((website) => website.id !== website_Id));

    setSuccessAlert(isDeleted);

    setTimeout(() => {
      setSuccessAlert(false);
    }, 4000);
  };

  return (
    <Container className="mt-5">
      {successAlert && (
        <Alert variant="info" onClose={() => setSuccessAlert(false)} dismissible>
          Block website successfully!
        </Alert>
      )}
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th scope="col">Site</th>
            <th scope="col">Comment</th>
            <th scope="col">Block</th>
          </tr>
        </thead>
        <tbody id="website">
          {memoizedWebsites.map((items) => (
            <tr key={items.id}>
              <td>
                <a href={`https://${items.url}`} target="_blank" rel="noopener noreferrer">
                  {items.url}
                </a>
              </td>
              <td>{items.comment}</td>
              <td>
                <Button onClick={() => handleButtonClickBlock(items.id)} variant="info">
                  Block
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
  
export default WebsiteTable;