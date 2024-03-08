import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ContextProvider } from './contex/setupInformation';

import './App.css';

import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer/Footer';
import useToken from './Services/useToken';

const HomePage = lazy(() => import('./components/Home/HomePage'));

const LoginPage = lazy(() => import('./components/auth/LoginPage'));
const RegisterPage = lazy(() => import('./components/auth/RegisterPage'));
const AlertPage = lazy(() => import('./components/alert/AlertPage'));
const EndpointPage = lazy(() => import('./components/endpoint/EndpointsPages'));
const EventTable = lazy(() => import('./components/events/EventsTablePage'));

const WebsiteTable = lazy(() => import('./components/website/WebsiteTablePage'));
const AddWebsite = lazy(() => import('./components/website/WebsiteAddPage'));
const BackupPage = lazy(() => import('./components/backup/BackupPage'));


function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <LoginPage setToken={setToken} />;
  };

  return (
    <ContextProvider>
      <Router>
        <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/register/' element={<RegisterPage />} />


              <Route path='/alerts/:name' element={<AlertPage />} />
              <Route path='/endpoints/:name' element={<EndpointPage />} />


              <Route
                  path='/events/:name'
                  element={
                      <PrivateRoute requiredPermissions={process.env.REACT_APP_ROLE}>
                          <EventTable />
                      </PrivateRoute>
                  }
              />

              <Route
                  path='/websites/:name'
                  element={
                      <PrivateRoute requiredPermissions={process.env.REACT_APP_ROLE}>
                          <WebsiteTable />
                      </PrivateRoute>
                  }
              />

              <Route path='/backup/:name' element={<BackupPage />} />

              <Route
                  path='/websites/addwebsite/:name'
                  element={
                      <PrivateRoute requiredPermissions={process.env.REACT_APP_ROLE}>
                          <AddWebsite />
                      </PrivateRoute>
                  }
              />
            </Routes>
          </Suspense>
        <Footer />
      </Router>
    </ContextProvider>
  );
};

export default App;