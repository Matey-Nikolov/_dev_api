import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { CreateAccount } from '../../Services/registerService';

const RegisterPage = () => {
    const [form, setForm] = useState({
        email: '',
        role: '',
        clientId: '',
        clientSecret: '',
        password: ''
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
            console.log('work');

            const createAccount = new CreateAccount(form.email, form.password, form.role, form.clientId, form.clientSecret);

            setForm({
                email: '',
                role: '',
                clientId: '',
                clientSecret: '',
                password: ''
            });

            setTouched({});

            createAccount.createAccount();

            setSuccessMessage('Account created successfully!');
        };
    };

    function validateInputs(form) {
        let errors = {};

        if (!form.email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = 'Email address is invalid.';
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

        if (!form.password) {
            errors.password = 'Password is required.';
        } else if (form.password.length < 6) {
            errors.password = 'Password needs to be 6 characters or more.';
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
                            <h3 className="text-center font-weight-light my-4">Create Account</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleRegister}>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="email">Email</Form.Label>
                                            <Form.Control id="email" type="email" placeholder="Enter your email" onChange={handleChange} isInvalid={touched.email && errors.email} value={form.email} />
                                            {touched.email && errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="role">Select role</Form.Label>
                                            <Form.Select id="role" onChange={handleChange} isInvalid={touched.role && errors.role} value={form.role}>
                                                <option value="">Select role</option>
                                                <option value="admin">Admin</option>
                                                <option value="guest">Guest</option>
                                            </Form.Select>
                                            {touched.role && errors.role && <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>}
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

                                <Form.Group className="mb-3 mb-md-0">
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control id="password" type="password" placeholder="Create a password" onChange={handleChange} isInvalid={touched.password && errors.password} value={form.password} />
                                    {touched.password && errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                                </Form.Group>

                                <div className="mt-4 mb-0">
                                    <div className="d-grid">
                                        <Button id="registerPage" variant="primary" type="submit" className="btn-block">Create Account</Button>
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