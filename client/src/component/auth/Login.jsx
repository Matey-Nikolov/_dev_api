import React, {  useState } from 'react';
import PropTypes from 'prop-types';

import { signInWithEmail } from '../../Services/loginService';
import { postToken } from '../../axiosrequests/apiToken';
import { whoIAm } from '../../axiosrequests/apiAuth';
import { useGlobalState, setGlobalState } from '../../hooks';

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default function LoginPage ({ setToken }){
  const [client_Id_Db] = useGlobalState('client_Id_Db');
  const [client_secret_Db] = useGlobalState('client_secret_Db');

  const [formData, setFormData] = useState({ client_Id_Db, client_secret_Db});

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [error, setError] = useState([]);

  const signIn = async (e) =>{
    e.preventDefault();

    let accessToken = await signInWithEmail(email, password);

    if (accessToken !== undefined && accessToken !== '') {
      setToken(accessToken);

      try {
        let setAuthToken = await postToken(formData);
        let tenetId = await whoIAm(setAuthToken);

        setGlobalState('tenetId', tenetId);
        setGlobalState('tokenTenat', setAuthToken);

      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    setError('Invalid username or password');
  };

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

                  <form onSubmit={signIn}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email:</label>
                      <input type="email" className="form-control" id="email" value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password:</label>
                      <input type="password" className="form-control" id="password" value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type='submit' className='btn btn-primary'>Login</button>
                  </form>

                  {error !== undefined && (
                    <div className="mt-4 mb-0 text-danger">{error}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};