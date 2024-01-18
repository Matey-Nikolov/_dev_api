import React from 'react';
import PropTypes from 'prop-types';

import { AuthLogin } from '../../Services/loginService';
import { postToken } from '../../axiosrequests/apiToken';
import { whoIAm } from '../../axiosrequests/apiAuth';
import { setGlobalState } from '../../hooks';

class LoginPage extends React.Component {
  static propTypes = {
    setToken: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      useDataHook:''
    };
  };

  signInFromPage = async (e) => {
    e.preventDefault();
    const istanceClass = new AuthLogin(this.state.email, this.state.password);

    const accessToken = await istanceClass.signIn();

    if (accessToken !== undefined && accessToken !== '') {
      this.props.setToken(accessToken);

      const informationData = await istanceClass.findUserByEmail(this.state.email);

      const client_Id_Db = informationData.clientId;
      const client_secret_Db = informationData.client_secret_Id;

      const  infoUser = { client_Id_Db, client_secret_Db };

      try {
        let setAuthToken = await postToken(infoUser);
        let tenetId = await whoIAm(setAuthToken);

        setGlobalState('tenetId', tenetId);
        setGlobalState('tokenTenat', setAuthToken);

      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    this.setState({ error: 'Invalid username or password' });
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-lg border-0 rounded-lg mt-5" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-3 text-center">
                  <div className="mb-3 mt-2">
                    <h2 className="font-weight-light text-uppercase">Login</h2>
                    <p className="font-weight-light mb-3">Please enter your email and password!</p>

                    <form onSubmit={this.signInFromPage}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" value={this.state.email} placeholder='Enter your email' onChange={(e) => this.setState({ email: e.target.value })} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" value={this.state.password} placeholder='Enter your password' onChange={(e) => this.setState({ password: e.target.value })} />
                      </div>

                      <button type='submit' className='btn btn-primary'>Login</button>
                    </form>

                    {this.state.error !== undefined && (
                      <div className="mt-4 mb-0 text-danger">{this.state.error}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default LoginPage;