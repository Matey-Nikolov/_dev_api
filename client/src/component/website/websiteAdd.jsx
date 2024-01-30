import React, { useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import getWebsiteServiceInstance from '../../Services/websiteService';

// import { useGlobalState } from '../../hooks';
import secureStorage   from 'react-secure-storage';

const AddWebsite = () => {

  const tenetId = secureStorage.getItem('tenetId');
  const tokenTenat = secureStorage.getItem('tokenTenat');
  
  // return class 
  const websiteService = new getWebsiteServiceInstance(tokenTenat, tenetId);

  const navigate = useNavigate();

  const [successAddWebsite, setSuccessAddWebsite] = useState(false);
  const [errorAddWebsite, setErrorAddWebsite] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const websiteUrl = e.target.elements.url.value;

    const isAddWebsite = await websiteService.btnAllowWebsite(websiteUrl);

    setSuccessAddWebsite(isAddWebsite === 200);
    setErrorAddWebsite(isAddWebsite === -1);

    e.target.elements.url.value = '';

    setTimeout(() => {
      setSuccessAddWebsite(false);
      setErrorAddWebsite(false);
    }, 4000);
  };

  return (
    <div className="container-fluid px-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <Card className="shadow-lg border-0 rounded-lg mt-5">
                  <Card.Header>
                    <h3 className="text-center font-weight-light my-4">Add website</h3>
                    
                    <h6
                      role="button"
                      onClick={() => navigate(-1)}
                      className="text-left font-weight-light my-4"
                    >
                      <i className="fas fa-arrow-left">Back</i>
                    </h6>

                    {successAddWebsite && (
                      <Alert variant="info" onClose={() => setSuccessAddWebsite(false)} dismissible>
                        Add website successfully!
                      </Alert>
                    )}

                    {errorAddWebsite && (
                      <Alert variant="danger" onClose={() => setErrorAddWebsite(false)} dismissible>
                        Exsist website!
                      </Alert>
                    )}

                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formUrl" className="form-floating mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Enter website URL"
                          name="url"
                          onChange={() => {}}
                          required
                        />
                        <Form.Label>Website URL</Form.Label>
                      </Form.Group>

                      <div className="mt-4 mb-0">
                        <div className="d-grid">
                          <Button type="submit" className="btn btn-primary btn-block">
                            Add website
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
    </div>
  );
};

export default AddWebsite;