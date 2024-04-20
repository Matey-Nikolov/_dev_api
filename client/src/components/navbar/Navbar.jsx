import { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import './css/navbar.css';

import { UseCreatedContex } from '../../contex/setupInformation';

import SecureStorage from 'react-secure-storage';

const Navbar = () => {
  const { currentClient_role , currentClient_name } = useContext(UseCreatedContex);

  const roleFromEnv = process.env.REACT_APP_ROLE;

  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setIsDashboard(location.pathname === '/');
    setIsRegister(location.pathname === '/register');
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = () => {
    SecureStorage.removeItem('token');
    SecureStorage.removeItem('ref');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <NavLink 
        className={`navbar-brand ${activeLink === "/" ? "active" : ""}`} 
        to="/"
        onClick={() => setActiveLink("/")}
      >
        Customers
      </NavLink>

      {isDashboard || isRegister ? (
        <>
          <NavLink 
            className={`navbar-brand ${activeLink === "/register" ? "active" : ""}`} 
            to="/register"
            onClick={() => setActiveLink("/register")}
          >
            Access setup
          </NavLink>
          <button className="btn btn-outlin" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {currentClient_role === roleFromEnv && (
            <>
              <NavLink 
                className={`navbar-brand ${activeLink === `/events/${currentClient_name}` ? "active" : ""}`} 
                to={`/events/${currentClient_name}`}
                onClick={() => setActiveLink(`/events/${currentClient_name}`)}
              >
                Events
              </NavLink> 
            </>
          )}

          <NavLink 
            className={`navbar-brand ${activeLink === `/alerts/${currentClient_name}` ? "active" : ""}`} 
            to={`/alerts/${currentClient_name}`}
            onClick={() => setActiveLink(`/alerts/${currentClient_name}`)}
          >
            Alerts
          </NavLink>
          <NavLink 
            className={`navbar-brand ${activeLink === `/endpoints/${currentClient_name}` ? "active" : ""}`} 
            to={`/endpoints/${currentClient_name}`}
            onClick={() => setActiveLink(`/endpoints/${currentClient_name}`)}
          >
            Endpoints
          </NavLink>

          {currentClient_role === roleFromEnv && (
            <>
              <NavLink 
                className={`navbar-brand ${activeLink === `/websites/${currentClient_name}` ? "active" : ""}`} 
                to={`/websites/${currentClient_name}`}
                onClick={() => setActiveLink(`/websites/${currentClient_name}`)}
              >
                Websites
              </NavLink> 
            </>
          )}

          <NavLink 
            className={`navbar-brand ${activeLink === `/backup/${currentClient_name}` ? "active" : ""}`} 
            to={`/backup/${currentClient_name}`}
            onClick={() => setActiveLink(`/backup/${currentClient_name}`)}
          >
            Management
          </NavLink>

          <div class="right">
            <p className="navbar-brand mb-0">Customer - {currentClient_name}</p>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;