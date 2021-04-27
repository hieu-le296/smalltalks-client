import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';
import {
  useQuestions,
  clearQuestions,
  clearQuestion
} from '../../context/question/QuestionState';

import {useComment, clearCommentsWhenBack} from '../../context/comment/commentState';

const API_URL = 'http://datacomputation.com/uploads/avatars';

const Navbar = ({ icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  // We just need questionDispatch, so questionDispatch is at index 1
  const questionDispatch = useQuestions()[1];

  const commentDispatch = useComment()[1];

  const onLogout = () => {
    logout(authDispatch);
    clearQuestions(questionDispatch);
    
  };

  const authLinks = (
    <Fragment>
      {user && (
        <li className='nav-item'>
          <Link to={`/users/${user.data.username}`} className='nav-link'>
            <img
              src={user && `${API_URL}/${user.data.profilePic}`}
              className='rounded-circle'
              height='25'
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
          <li className='dropdown-item'>Hello {user && user.data.name}</li>
          <li className='dropdown-item nav-link text-black '>
            <i className='fas fa-user-alt ' />{' '}
            <Link to='/profile' className='text-black'>
              My Profile
            </Link>
          </li>

          {user && user.data.role === 'admin' ? (
            <li className='dropdown-item nav-link text-black '>
              <i className='fas fa-lock'></i>{' '}
              <Link to='/admin' className='text-black'>
                Admin Page
              </Link>
            </li>
          ) : (
            ''
          )}

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

  const onClick = e => {
    //e.preventDefault()
    clearCommentsWhenBack(commentDispatch)
    clearQuestion(questionDispatch);
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid '>
        <Link to='/' className='navbar-brand text-white' onClick={onClick}>
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
