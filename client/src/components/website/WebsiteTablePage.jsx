import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Alert, Container } from 'react-bootstrap';

import getWebsiteServiceInstance from '../../Services/websiteService';

import { useNavigate } from "react-router-dom";

import { UseCreatedContex } from '../../contex/setupInformation';

const WebsiteTable = () => {
  const navigate = useNavigate();
  const { currentClient_id, currentClient_name } = useContext(UseCreatedContex);

  const websiteService = new getWebsiteServiceInstance(currentClient_id);

  const [useAllWebsites, setWebsites] = useState([]);

  const [successAlert, setSuccessAlert] = useState(false);

  const fetchWebsites = async () =>{
    const websites = await websiteService.getWebsiteData();

    if (websites != []) {
      setWebsites(websites);
    };
  };

  useEffect(() => {
    fetchWebsites();
  });
  
  async function handleButtonClickBlockWebsite(website_Id, url){
    const isDeleted = await websiteService.btnBlockWebsite(website_Id, url);

    setWebsites((prevWebsites) => prevWebsites.filter((website) => website.id !== website_Id));

    setSuccessAlert(isDeleted);

    setTimeout(() => {
      setSuccessAlert(false);
    }, 4000);
  };

  if (!useAllWebsites) {
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
      <Button onClick={() => navigate(`/websites/addwebsite/${currentClient_name}`)} variant="info">
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
          {useAllWebsites.map((items) => (
            <tr key={items.id}>
              <td>
                <a href={`https://${items.url}`} target="_blank" rel="noopener noreferrer">
                  {items.url}
                </a>
              </td>
              <td>{items.comment}</td>
              <td>
                <Button onClick={() => handleButtonClickBlockWebsite(items.id, items.url)} variant="info">
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