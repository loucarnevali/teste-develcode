import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary p-4">
        <div className="d-flex align-items-center  w-100">
          <a className="navbar-brand" href="/" style={{ fontSize: '2rem' }}>
            User Registration
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
