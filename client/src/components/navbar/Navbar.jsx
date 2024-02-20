import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
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
          <Link className="navbar-brand" to="/alerts">Alerts</Link>
          <Link className="navbar-brand" to="/endpoints">endpoints</Link> 
          <Link className="navbar-brand" to="/events">events</Link> 
          <Link className="navbar-brand" to="/websites">websites</Link> 
        </>
      )}
    </nav>
  );
};

export default Navbar;