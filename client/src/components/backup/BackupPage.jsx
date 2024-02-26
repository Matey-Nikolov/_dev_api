import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import ButtonsArchive from './ButtonsBackup';
import BackupFormPage from './BackupForm';

import { findClientById } from '../../Services/clientServiceFolder/clientSevice';

import { UseCreatedContex } from '../../contex/setupInformation';

const BackupPage = () =>{
  const { currentClient_id } = useContext(UseCreatedContex);
 
  const [useRole, setRole] = useState();
  
  const [useClikedButton, setClikedButton] = useState(false);

  const [usePolicy, setPolicy] = useState('');
  const [useSoftware, setSoftware] = useState([]);

  useEffect(() => {
    const client = findClientById(currentClient_id);

    if (client !== -1) {
      setRole(client.role);
      setSoftware(client.software.installers);
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
          {useClikedButton && usePolicy !== 'download' ? (
            <BackupFormPage getNameOfPolicy={usePolicy} />
          ) : (
            <>
              {usePolicy ? (
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <Card className="shadow-lg border-0 rounded-lg mt-5">
                      <Card.Body>
                        <h4 className="text-center font-weight-light my-4">
                          Installers
                        </h4>

                        <Table responsive bordered striped className="mt-2">
                          <thead>
                            <tr>
                              <th scope="col">Platforms</th>
                              <th scope="col">Download Links</th>
                            </tr>
                          </thead>
                          <tbody>
                            {useSoftware.map((value) => (
                              <tr key={value.name}>
                                <td>{value.platform} - {value.type}</td>
                                <td><a href={value.downloadUrl}>Download</a></td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : (
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <Card className="shadow-lg border-0 rounded-lg mt-5">
                      <Card.Body>
                        <p className="text-center font-weight-light my-4">
                          If you want to download a policy is you have it on your local machine, you can choose from the list of buttons on the left.
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BackupPage;