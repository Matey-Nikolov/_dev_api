import React, { useState, useEffect, useMemo } from 'react';
import { Table, Button, Alert, Container } from 'react-bootstrap';

import getWebsiteServiceInstance from '../../Services/websiteService';

import { useNavigate } from "react-router-dom";

// import { useGlobalState } from '../../hooks';
import secureStorage   from 'react-secure-storage';

const WebsiteTable = () => {
  const navigate = useNavigate();

  const tenetId = secureStorage.getItem('tenetId');
  const tokenTenat = secureStorage.getItem('tokenTenat');
  
  // return class 
  const websiteService = new getWebsiteServiceInstance(tokenTenat, tenetId);

  const [useWebsites, setWebsites] = useState([]);

  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const websiteData = await websiteService.allowWebsite();
        setWebsites([...websiteData]);
      } catch (error) {
        console.error('Error fetching websites:', error);
        throw error;
      }
    };
  
    fetchData();
  }, [websiteService]);
  
  const memoizedWebsites = useMemo(() => useWebsites, [useWebsites]);
  
  async function handleButtonClickBlockWebsite(website_Id){
    const isDeleted = await websiteService.btnBlockWebsite(website_Id);

    setWebsites((prevWebsites) => prevWebsites.filter((website) => website.id !== website_Id));

    setSuccessAlert(isDeleted);

    setTimeout(() => {
      setSuccessAlert(false);
    }, 4000);
  };

  if (!memoizedWebsites) {
    return(
      <>
        <div className="container-fluid px-4">
          <div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">Welcome to API center</h3>
                      <h5 className="text-center font-weight-light my-4">
                        Loading website from database.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Container className="mt-5">
      <Button onClick={() => navigate('/addwebsite')} variant="info">
        Add website
      </Button>
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
                <Button onClick={() => handleButtonClickBlockWebsite(items.id)} variant="info">
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