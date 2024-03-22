import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { CreateAccount } from '../../Services/registerService';

const RegisterPage = () => {
    const [form, setForm] = useState({
        role: '',
        clientId: '',
        clientSecret: '',
        name: ''
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
        
    const handleRegister = (e) => {
        e.preventDefault();

        const validationErrors = validateInputs(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const createAccount = new CreateAccount(form.name, form.role, form.clientId, form.clientSecret);

            setForm({
                role: '',
                clientId: '',
                clientSecret: '',
                name: ''
            });

            setTouched({});

            createAccount.createAccount();

            setSuccessMessage('Account created successfully!');
        };
    };

    function validateInputs(form) {
        let errors = {};

        if (!form.name) {
            errors.role = 'Name is required.';
        };

        if (!form.role) {
            errors.role = 'Role is required.';
        };

        if (!form.clientId) {
            errors.clientId = 'Client id is required.';
        } else if (form.clientId.length < 30) {
            errors.clientId = 'Client id needs to be 30 characters or more.';
        };

        if (!form.clientSecret) {
            errors.clientSecret = 'Client secret is required.';
        } else if (form.clientSecret.length < 90) {
            errors.clientSecret = 'Client secret needs to be 90 characters or more.';
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
                <Col lg={7}>
                    <Card className="shadow-lg border-0 rounded-lg mt-5">
                        <Card.Header>
                            <h3 className="text-center font-weight-light my-4">Create client</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleRegister}>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="role">Select role</Form.Label>
                                            <Form.Select id="role" onChange={handleChange} isInvalid={touched.role && errors.role} value={form.role}>
                                                <option value="">Select role</option>
                                                <option value="R/O">R/O</option>
                                                <option value="R/W">R/W</option>
                                            </Form.Select>
                                            {touched.role && errors.role && <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="name">Client name</Form.Label>
                                            <Form.Control id="name" type="text" placeholder="Set name" onChange={handleChange} isInvalid={touched.name && errors.name} value={form.name} />
                                            {touched.name && errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="clientId">Client id</Form.Label>
                                            <Form.Control id="clientId" type="password" placeholder="Set client id" onChange={handleChange} isInvalid={touched.clientId && errors.clientId} value={form.clientId} />
                                            {touched.clientId && errors.clientId && <Form.Control.Feedback type="invalid">{errors.clientId}</Form.Control.Feedback>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="clientSecret">Client secret</Form.Label>
                                            <Form.Control id="clientSecret" type="password" placeholder="Set client secret" onChange={handleChange} isInvalid={touched.clientSecret && errors.clientSecret} value={form.clientSecret} />
                                            {touched.clientSecret && errors.clientSecret && <Form.Control.Feedback type="invalid">{errors.clientSecret}</Form.Control.Feedback>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="mt-4 mb-0">
                                    <div className="d-grid">
                                        <Button id="registerPage" variant="primary" type="submit" className="btn-block">Create client</Button>
                                    </div>
                                </div>
                            </Form>
                            {successMessage && <p className="text-center text-success">{successMessage}</p>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;