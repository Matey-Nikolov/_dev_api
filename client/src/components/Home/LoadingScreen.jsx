import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingScreen = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading information...</span>
      </Spinner>
      <p>Please wait, the environment is loading</p>
    </div>
  </div>
);

export default LoadingScreen;