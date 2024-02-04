import React from 'react';
import PropTypes from 'prop-types';
import secureStorage from 'react-secure-storage';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import './css/LoginPage.css'

import { AuthLogin } from '../../Services/loginService';
import { postToken } from '../../axiosrequests/apiToken';
import { whoIAm } from '../../axiosrequests/apiAuth';

class LoginPage extends React.Component {
  static propTypes = {
    setToken: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.token = '';

    this.state = 
    {
      email: '',
      password: '',
      error: '',
    };

    this.infoUser = 
    {
      'client_Id_Db' : '',
      'client_secret_Db': ''
    };

    this.getToken = false;
  };

  validate() {
    if(this.state.email === '' && this.state.password  === ''){
      this.setState({ error: 'Enter username and password!' });
      return;
    };

    if (!this.state.email) {
      this.setState({ error: 'Enter email!' });
      return;
    }
    else if(!this.state.password){
      this.setState({ error: 'Enter password!' });
      return;
    };

    return true;
  };

  async signInForToken(instanceAuthClass){
    const accessToken = await instanceAuthClass.signIn();

    if (accessToken === undefined || accessToken === '' ||  accessToken === false) {
      this.setState({ error: 'Invalid username or password!' });
      
      return;
    };

    this.token = accessToken;
    this.getToken = true;
  };

  async findUser(instanceAuthClass){

    const informationData = await instanceAuthClass.findUserByEmail(this.state.email);

    this.infoUser.client_Id_Db = informationData.clientId;
    this.infoUser.client_secret_Db = informationData.client_secret_Id;
  };

  async setUpEnvironment(){
    try {
      const setAuthToken = await postToken(this.infoUser);
      
      const tenantId = await whoIAm(setAuthToken);

      secureStorage.setItem('tenetId', tenantId);
      secureStorage.setItem('tokenTenat', setAuthToken);

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  handleSignIn = async (e) => {
    e.preventDefault();

    const instanceAuthClass = new AuthLogin(this.state.email, this.state.password);

    if (this.validate()) {
      await this.signInForToken(instanceAuthClass);
    };

    if (this.getToken){
      await this.findUser(instanceAuthClass);
    };

    await this.setUpEnvironment();

    this.props.setToken(this.token);
  };

  render() {
    return (
      <Container className="full-screen">
        <Row className="justify-content-center align-items-center vh-100">

          <Card className="shadow-lg rounded-lg mt-3 card-background">
            <Card.Body className="p-3 text-center">
              <h3 className="font-weight-light text-uppercase">Website information</h3>
              <p className="font-weight-light mb-3">
                The goal of this thesis is to develop a web application that provides providers with a product to monitor and manage a group of endpoints (e.g., computers or servers). Provide an easy and simple to use interface for remote monitoring of computers. Provide an intuitive way to work with the application.
              </p>
            </Card.Body>
          </Card>

          <Col xs={10} md={6} lg={4}>
            <Card className="shadow-lg rounded-lg mt-3 card-background">
              <Card.Body className="p-3 text-center">
                <h3 className="font-weight-light text-uppercase">Login</h3>
                <p className="font-weight-light mb-3">Please enter your email and password!</p>

                <Form onSubmit={this.handleSignIn}>
                  <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={this.state.email}
                      placeholder="Enter your email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={this.state.password}
                      placeholder="Enter your password"
                      onChange={(e) => this.setState({ password: e.target.value })}
                    />
                  </Form.Group>

                  <p></p>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>

                {this.state.error && <div className="mt-4 mb-0 text-danger">{this.state.error}</div>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
};

export default LoginPage;