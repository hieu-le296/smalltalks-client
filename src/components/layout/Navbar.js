import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link to='/dashboard' className='nav-link text-white'>
          Dashboard
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/profile' className='nav-link text-white'>
          Profile
        </Link>
      </li>
      <li className='nav-item'>
        <a onClick={onLogout} href='#!' className='nav-link text-white'>
          <i className='fas fa-sign-out-alt ' /> <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link to='/register' className='nav-link text-white'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link text-white'>
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg bg-primary'>
      <div className='container-fluid '>
        <button
          className='navbar-toggler'
          type='button'
          data-mdb-toggle='collapse'
          data-mdb-target='#navbarCenteredExample'
          aria-controls='navbarCenteredExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <i className='fas fa-bars' style={{ color: 'white' }}></i>
        </button>

        <div
          className='collapse navbar-collapse justify-content-center'
          id='navbarCenteredExample'
        >
          <ul className='navbar-nav mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to='/' className='navbar-brand text-white'>
                <i className={icon}></i>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-link text-white'>
                Home
              </Link>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
            <li className='nav-item'>
              <Link to='/about' className='nav-link text-white'>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  icon: 'fas fa-comments fa-lg',
};

export default Navbar;
