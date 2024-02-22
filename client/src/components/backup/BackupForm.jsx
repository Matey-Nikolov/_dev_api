import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

import findByBackupButton from '../../Services/backupService';

import { UseCreatedContex } from '../../contex/setupInformation';

const BackupFormPage = ( { getNameOfPolicy }) => {

    const { currentClient_id, currentClient_name } = useContext(UseCreatedContex);

    const [form, setForm] = useState({
        fileName: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });

        setTouched({
            ...touched,
            [e.target.id]: true
        });
    };
        
    const handleBackupInfomation = async (e) => {
        e.preventDefault();

        const validationErrors = validateInputs(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const folderName = currentClient_name;

            const statusAndFileName = await findByBackupButton(currentClient_id, getNameOfPolicy, form.fileName, folderName);

           isBackup(statusAndFileName);

            setForm({
                fileName: '',
                saveLocation: ''
            });

            setTouched({});
        };
    };

    const isBackup = (statusAndFileName) => {
        if (statusAndFileName.status === 201) {
            setSuccessMessage(`Backup for ${statusAndFileName.fileName} created successfully!`);
        };

        setTimeout(() => {
            setSuccessMessage('');
        }, 4000);
    };
    

    function validateInputs(form) {
        let errors = {};

        if (!form.fileName) {
            errors.fileName = 'Name of file is required.';
        };

        return errors;
    };

    useEffect(() => {
        let errors = validateInputs(form);

        setErrors(errors);
    }, [form]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <Card className="shadow-lg border-0 rounded-lg mt-5">
                        <Card.Header>
                            <h3 className="text-center font-weight-light my-4">Create backup for {getNameOfPolicy}</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleBackupInfomation}>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label htmlFor="fileName">File name</Form.Label>
                                            <Form.Control id="fileName" type="text" placeholder="Set file name" onChange={handleChange} isInvalid={touched.fileName && errors.fileName} value={form.fileName} />
                                            {touched.fileName && errors.fileName && <Form.Control.Feedback type="invalid">{errors.fileName}</Form.Control.Feedback>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="mt-4 mb-0">
                                    <div className="d-grid">
                                        <Button id="registerPage" variant="primary" type="submit" className="btn-block">Create backup</Button>
                                    </div>
                                </div>
                            </Form>

                            <p></p>

                            {successMessage && (
                                <Alert variant="success" onClose={() => successMessage('')} dismissible>
                                    {successMessage}
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BackupFormPage;