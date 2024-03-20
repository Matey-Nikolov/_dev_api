import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './css/LoginPage.css';
import { AuthLogin } from '../../Services/loginService';

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
      error: ''
    };

    this.infoUser = {
      client_Id_Db: '',
      client_secret_Db: ''
    };

    this.getToken = false;
  };

  validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.state.email.match(emailRegex)) {
      this.setState({ error: 'Enter a valid email address!' });

      return false;
    };

    if (!this.state.password) {
      this.setState({ error: 'Enter password!' });

      return false;
    };

    return true;
  };

  async signInForToken(instanceAuthClass) {
    const accessToken = await instanceAuthClass.signIn();

    if (accessToken === undefined || accessToken === '' ||  accessToken === false) {
      this.setState({ error: 'Invalid username or password!' });
      
      this.state.email = '';
      this.state.password = '';

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

  handleSignIn = async (e) => {
    e.preventDefault();

    const instanceAuthClass = new AuthLogin(this.state.email, this.state.password);

    if (this.validate()) {
      await this.signInForToken(instanceAuthClass);
    };

    if (this.getToken){
      await this.findUser(instanceAuthClass);
    };

    this.props.setToken(this.token);
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center align-items-center mt-5">
          <Col xs={10} md={6} lg={4}>
            <Card className="shadow rounded-lg p-4">
              <h3 className="text-uppercase mb-4 text-center">Login</h3>
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
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Login
                </Button>
              </Form>
              {this.state.error && <div className="mt-3 text-danger text-center">{this.state.error}</div>}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
};

export default LoginPage;