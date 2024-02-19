import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ContextProvider } from './contex/setupInformation';

import './App.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer/Footer';
import useToken from './Services/useToken';

const HomePage = lazy(() => import('./components/Home/HomePage'));
const ClientPanel = lazy(() => import('./components/Home/ClientPanel'));


const LoginPage = lazy(() => import('./components/auth/LoginPage'));
const RegisterPage = lazy(() => import('./components/auth/RegisterPage'));
const AlertPage = lazy(() => import('./components/alert/AlertPage'));
const EndpointPage = lazy(() => import('./components/endpoint/EndpointsPages'));
const EventTable = lazy(() => import('./components/events/EventsTablePage'));

const WebsiteTable = lazy(() => import('./components/website/WebsiteTablePage'));
const AddWebsite = lazy(() => import('./components/website/WebsiteAddPage'));

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
              <Route path="/client" element={<ClientPanel />} />
              <Route path='/register' element={<RegisterPage />} />
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
