import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useContext } from 'react';
import { UseCreatedContex } from '../../contex/setupInformation';

const Navbar = () => {
  const { currentClient_role , currentClient_name } = useContext(UseCreatedContex);

  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    setIsDashboard(location.pathname === '/');
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Customers Dashboard</Link>
      {isDashboard ? (
          <Link className="navbar-brand" to="/register">register</Link>
      ) : (
        <>
          {currentClient_role === 'R/W' && (
            <>
              <Link className="navbar-brand" to={`/events/${currentClient_name}`}>events</Link> 
              <Link className="navbar-brand" to={`/website/${currentClient_name}`}>websites</Link> 
            </>
          )}

          <Link className="navbar-brand" to={`/alerts/${currentClient_name}`}>alerts</Link>
          <Link className="navbar-brand" to={`/endpoints/${currentClient_name}`}>endpoints</Link>

          <div className="left d-flex justify-content-center align-items-center">
            <p className="navbar-brand mb-0">Customer - {currentClient_name}</p>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;