import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';

const Navbar = ({ icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  const onLogout = () => {
    logout(authDispatch);
    window.location.reload();
  };

  const authLinks = (
    <Fragment>
      {user && (
        <li className='nav-item'>
          <Link to={`/users/${user.data.username}`} className='nav-link'>
            <img
              src={
                user &&
                `${process.env.REACT_APP_API_URL}/uploads/avatars/${user.data.profilePic}`
              }
              className='rounded-circle'
              height='25'
              width='25'
              alt=''
              loading='lazy'
            />{' '}
            {user && user.data.name}
          </Link>
        </li>
      )}

      <li className='nav-item'>
        <Link to='/dashboard' className='nav-link'>
          Dashboard
        </Link>
      </li>

      <li className='nav-item dropdown'>
        <button
          className='nav-link d-flex align-items-center'
          id='navbarDropdownMenuLink'
          data-mdb-toggle='dropdown'
          aria-expanded='false'
          style={{ background: 'none', border: 'none' }}
        >
          <i className='dropdown-toggle' />
        </button>
        <ul
          className='dropdown-menu'
          id='dropDown'
          aria-labelledby='navbarDropdownMenuLink'
        >
          <li className='dropdown-item'>
            Hello <strong>{user && user.data.name}</strong>
          </li>
          <li className='dropdown-item nav-link text-black '>
            <i className='fas fa-user-alt ' />{' '}
            <Link to='/profile' className='text-black ms-1'>
              My Profile
            </Link>
          </li>

          {user && user.data.role === 'admin' ? (
            <li className='dropdown-item nav-link text-black '>
              <i className='fas fa-lock'></i>{' '}
              <Link to='/admin' className='text-black ms-1'>
                Admin Panel
              </Link>
            </li>
          ) : (
            ''
          )}

          <li className='nav-item '>
            <a
              onClick={onLogout}
              href='#!'
              className='nav-link logout text-black '
            >
              <i className='fas fa-sign-out-alt' />{' '}
              <span className='ms-1'>Logout</span>
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid '>
        <Link to='/' className='navbar-brand text-white'>
          <h4 className='ms-3'>
            <i className={icon} /> Small Talks
          </h4>
        </Link>
        <Link to='/about' className='nav-link text-white'>
          <h6>About</h6>
        </Link>

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
          <ul className='navbar-nav ms-auto me-5'>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  icon: 'fas fa-comments fa-lg',
  profilePic: 'http://datacomputation.com/uploads/default.jpeg',
};

export default Navbar;
