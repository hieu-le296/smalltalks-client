import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon }) => {
  return (
    <nav className='navbar navbar-expand-lg bg-secondary'>
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
