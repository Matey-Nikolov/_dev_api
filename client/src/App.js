import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './component/navbar/Navbar';
import Footer from './component/Footer/Footer';
import useToken from './Services/useToken';

const HomePage = lazy(() => import('./component/HomePage'));
const LoginPage = lazy(() => import('./component/auth/Login'));
// const RegisterPage = lazy(() => import('./component/register'));
const AlertPage = lazy(() => import('./component/alert/Alert'));
const EndpointPage = lazy(() => import('./component/endpoint/endpointPage'));
const EventTable = lazy(() => import('./component/events/eventTable'));
const WebsiteTable = lazy(() => import('./component/website/websiteTable'));

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* <Route path='/register' element={<RegisterPage />} /> */}
                  <Route path="/alerts" element={<AlertPage />} />
                  <Route path="/endpoints" element={<EndpointPage />} />
                  <Route path="/events" element={<EventTable />} />
                  <Route path="/websites" element={<WebsiteTable />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
