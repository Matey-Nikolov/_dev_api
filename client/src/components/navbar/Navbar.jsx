import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { UseCreatedContex } from '../../contex/setupInformation';

const Navbar = () => {
  const { currentClient_role , currentClient_name } = useContext(UseCreatedContex);

  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    setIsDashboard(location.pathname === '/');
    setIsRegister(location.pathname === '/register');
  }, [location]);

  return (
    <nav className="navbar navbar-light bg-light">
      <Link className="navbar-brand" to="/">Customers</Link>
      {isDashboard || isRegister ? (
          <Link className="navbar-brand" to="/register">Register client</Link>
      ) : (
        <>
          {currentClient_role === 'R/W' && (
            <>
              <Link className="navbar-brand" to={`/events/${currentClient_name}`}>Events</Link> 
            </>
          )}

          <Link className="navbar-brand" to={`/alerts/${currentClient_name}`}>Alerts</Link>
          <Link className="navbar-brand" to={`/endpoints/${currentClient_name}`}>Endpoints</Link>

          {currentClient_role === 'R/W' && (
            <>
              <Link className="navbar-brand" to={`/websites/${currentClient_name}`}>Websites</Link> 
            </>
          )}

          <Link className="navbar-brand" to={`/backup/${currentClient_name}`}>Management</Link>

          <div class="right">
            <p className="navbar-brand mb-0">Customer - {currentClient_name}</p>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;