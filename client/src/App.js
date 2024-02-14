import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ContextProvider } from './contex/setupInfamation';

import './App.css';

import Navbar from './component/navbar/Navbar';
import Footer from './component/Footer/Footer';
import useToken from './Services/useToken';

const HomePage = lazy(() => import('./component/Home/HomePage'));
const LoginPage = lazy(() => import('./component/auth/Login'));
// const RegisterPage = lazy(() => import('./component/register'));
const AlertPage = lazy(() => import('./component/alert/alert'));
const EndpointPage = lazy(() => import('./component/endpoint/endpointPage'));
const EventTable = lazy(() => import('./component/events/eventTable'));

const WebsiteTable = lazy(() => import('./component/website/websiteTable'));
const AddWebsite = lazy(() => import('./component/website/websiteAdd'));

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
              <Route path="/" element={<HomePage />} />
              {/* <Route path='/register' element={<RegisterPage />} /> */}
              <Route path="/alerts" element={<AlertPage />} />
              <Route path="/endpoints" element={<EndpointPage />} />
              <Route path="/events" element={<EventTable />} />
              <Route path="/websites" element={<WebsiteTable />} />
              <Route path="/addwebsite" element={<AddWebsite />} />
            </Routes>
          </Suspense>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
