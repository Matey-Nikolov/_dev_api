import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import ButtonsArchive from './ButtonsBackup';
import BackupFormPage from './BackupForm';

import { findClientById } from '../../Services/clientServiceFolder/clientSevice';

import { UseCreatedContex } from '../../contex/setupInformation';

const BackupPage = () =>{
  const { currentClient_id } = useContext(UseCreatedContex);
 
  const [useRole, setRole] = useState();
  
  const [useClikedButton, setClikedButton] = useState(false);

  const [usePolicy, setPolicy] = useState('');

  useEffect(() => {
    const client = findClientById(currentClient_id);

    if (client !== -1) {
      setRole(client.role);
    };
  });

  const handleBackUpChange = async (value) => {
    setPolicy(value);
    
    setClikedButton(true);
  };

  return (
    <Container fluid className="px-4">
        <Row>
            <Col lg={3}>
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                        <h3 className="text-center font-weight-light my-4">Btns</h3>
                        <h4 className="text-center font-weight-light my-4">
                        <ButtonsArchive
                          handleBackUpChange={handleBackUpChange}
                          role={useRole}
                        />
                        </h4>
                    </div>
                </div>
            </Col>
            <Col xs={8}>
              {useClikedButton ? (
                <BackupFormPage getNameOfPolicy={usePolicy}>

                </BackupFormPage>
              ) : (
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <Card className="shadow-lg border-0 rounded-lg mt-5">
                      <Card.Body>
                        <p className="text-center font-weight-light my-4">If you want to download a policy is you have it on your local machine, you can choose from the list of buttons on the left.</p>
                              
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </Col>
        </Row>
    </Container>
  );
};

export default BackupPage;