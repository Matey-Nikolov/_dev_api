import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Customers Dashboard</Link>
      {/* <Link className="navbar-brand" to="/alerts">Alerts</Link> */}
      <Link className="navbar-brand" to="/register">register</Link>
      {/* <Link className="navbar-brand" to="/endpoints">endpoints</Link>
      <Link className="navbar-brand" to="/events">events</Link>
      <Link className="navbar-brand" to="/websites">websites</Link> */}
    </nav>
  );
};

export default Navbar;