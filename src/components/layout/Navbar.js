import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import QuestionContext from '../../context/question/questionContext';

const API_URL = 'http://datacomputation.com/uploads';

const Navbar = ({ icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user, loadUser } = authContext;

  const questionContext = useContext(QuestionContext);

  const { clearQuestions } = questionContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearQuestions();
  };

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link to='/dashboard' className='nav-link'>
          Dashboard
        </Link>
      </li>

      <li className='nav-item dropdown'>
        <button
          className='nav-link dropdown-toggle d-flex align-items-center'
          id='navbarDropdownMenuLink'
          data-mdb-toggle='dropdown'
          aria-expanded='false'
          style={{ background: 'none', border: 'none' }}
        >
          <img
            src={user && `${API_URL}/${user.data.profilePic}`}
            className='rounded-circle'
            height='25'
            alt=''
            loading='lazy'
            onError={(e) => (e.style.visibility = 'hidden')}
          />
        </button>
        <ul
          className='dropdown-menu'
          id='dropDown'
          aria-labelledby='navbarDropdownMenuLink'
        >
          <li className='dropdown-item'>Hello {user && user.data.name}</li>
          <li className='dropdown-item nav-link text-black '>
            <i className='fas fa-user-alt ' />{' '}
            <Link to='/profile' className='text-black'>
              My Profile
            </Link>
          </li>

          <li className='nav-item '>
            <a onClick={onLogout} href='#!' className='nav-link text-black '>
              <i className='fas fa-sign-out-alt' /> <span>Logout</span>
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
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>

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
