import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './component/navbar/Navbar';

import Footer from './component/Footer/Footer';
import HomePage from './component/HomePage';
import LoginPage from './component/auth/Login';
import RegisterPage from './component/register';
import AlertTable from './component/alert/alert';
import useToken from './Services/useToken';
import EndpointPage from './component/endpoint/endpointPage';
import EventTable from './component/events/eventTable';
import WebsiteTable from './component/website/websiteTable';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <LoginPage setToken={setToken} />
  };

  return (
    <Router> 
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10">
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/alerts' element={<AlertTable />} />
                <Route path='/endpoints' element={<EndpointPage />} />
                <Route path='/events' element={<EventTable />} />
                <Route path='/websites' element={<WebsiteTable />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
