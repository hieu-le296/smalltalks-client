import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  useUsers,
  setCurrentUser,
  updateUser,
  deleteUser,
  clearCurrentUser,
} from '../../../context/users/UserState';
import AlertContext from '../../../context/alert/alertContext';

import UserModal from './UserModal';

const API_URL = 'http://datacomputation.com/uploads';

const UserItem = ({ user }) => {
  const [userState, userDispatch] = useUsers();
  const { error } = userState;

  const [show, setShow] = useState(false);

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const {
    userId,
    name,
    username,
    email,
    role,
    profilePic,
    createdAt,
    updatedAt,
  } = user;

  const onDelete = async (e) => {
    if (window.confirm(`Are you sure to delete user ${name}`)) {
      const msg = await deleteUser(userDispatch, userId);

      setAlert(msg, 'warning');

      if (error) {
        setAlert(error, 'danger');
      }
    }
  };

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
    }
  }, [setAlert, error]);

  const onClickEditUser = () => {
    setCurrentUser(userDispatch, user);
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
    clearCurrentUser(userDispatch);
  };

  return (
    <Fragment>
      <div className='card'>
        <div className='card-body '>
          <img
            src={user && `${API_URL}/avatars/${profilePic}`}
            className='rounded-circle shadow-2-strong profile-pic'
            height='75'
            width='75'
            alt='profile'
            loading='lazy'
            onError={(e) => (e.style.visibility = 'hidden')}
          />
          <Link to={`/users/${username}`}>
            <h3 className='card-title fw-bold'>{name}</h3>{' '}
          </Link>
          <p className='lead'>
            <strong>Username</strong>: {username}
          </p>
          <p className='lead'>
            <strong>Email:</strong> {email}
          </p>
          <p className='lead'>
            <strong>Role:</strong> {role}
          </p>
        </div>

        <div className='mb-3'>
          {/* <button
            type='button'
            className='btn btn-secondary btn-rounded btn-sm me-3'
            onClick={onClickEditUser}
          >
            <i className='fas fa-pencil-alt' /> Edit User
          </button> */}
          <button
            type='button'
            className='btn btn-danger btn-sm btn-rounded'
            onClick={onDelete}
          >
            <i className='fas fa-trash' /> Delete
          </button>
        </div>

        <div className='card-footer text-muted fs-6'>
          <p>
            <strong>Created: </strong>
            {new Date(`${createdAt}`).toLocaleString()}
          </p>
          <p>
            <strong>Modified</strong>:{' '}
            {new Date(`${updatedAt}`).toLocaleString()}
          </p>
        </div>
      </div>
      <UserModal
        title='Update User'
        user={user}
        onClose={onClose}
        show={show}
      />
    </Fragment>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
