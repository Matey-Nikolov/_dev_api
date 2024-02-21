import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ContextProvider } from './contex/setupInformation';

import './App.css';

import Navbar from './components/navbar/Navbar';
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
              <Route path='/register/:name' element={<RegisterPage />} />
              <Route path='/alerts/:name' element={<AlertPage />} />
              <Route path='/endpoints/:name' element={<EndpointPage />} />
              <Route path='/events/:name'element={<EventTable />} />
              <Route path='/websites/:name' element={<WebsiteTable />} />
              <Route path='/addwebsite/:name' element={<AddWebsite />} />
            </Routes>
          </Suspense>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
