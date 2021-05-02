import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useUsers, deleteUser } from '../../../context/users/UserState';
import AlertContext from '../../../context/alert/alertContext';

import Modal from '../../layout/Modal';

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

  const [profile, setProfile] = useState({
    p_name: '',
    p_username: '',
    p_email: '',
  });

  const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');

  useEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }

    if (error) {
      setAlert(error, 'danger');
    }
  }, [user, setAlert, error]);

  const { p_name, p_username, p_email } = profile;

  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const onChangeAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const onChangeBackGround = (e) => {
    setBackground(e.target.files[0]);
  };

  const form = (
    <Fragment>
      <div className='container-fluid text-center'>
        <div>
          <img
            src={user && `${API_URL}/backgrounds/${user.backgroundPic}`}
            className='img-fluid shadow-2-strong background-pic'
            alt='...'
            style={{ maxWidth: '75%' }}
          />
        </div>
        <div>
          <img
            src={user && `${API_URL}/avatars/${user.profilePic}`}
            className='rounded-circle shadow-2-strong profile-pic'
            height='125'
            width='125'
            alt=''
            loading='lazy'
          />
        </div>
        <h1 className='mt-3'>{name}</h1>
      </div>

      <div className='form-container'>
        <ul
          className='nav nav-pills nav-justified mb-3'
          id='ex1'
          role='tablist'
        >
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link active'
              id='tab-details'
              data-mdb-toggle='pill'
              href='#pills-details'
              role='tab'
              aria-controls='pills-details'
              aria-selected='true'
            >
              Details
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link'
              id='tab-other'
              data-mdb-toggle='pill'
              href='#pills-other'
              role='tab'
              aria-controls='pills-other'
              aria-selected='false'
            >
              Others
            </a>
          </li>
        </ul>

        <div className='tab-content'>
          <div
            className='tab-pane fade show active'
            id='pills-details'
            role='tabpanel'
            aria-labelledby='tab-details'
          >
            <form>
              <div className='mb-4'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  value={p_name}
                  onChange={onChange}
                />
              </div>

              <div className=' mb-4'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  className='form-control'
                  name='username'
                  value={p_username}
                  onChange={onChange}
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  value={p_email}
                  onChange={onChange}
                />
              </div>

              <button
                type='submit'
                className='btn btn-success btn-lg btn-block'
              >
                <i className='fas fa-save' /> Update Profile
              </button>
            </form>
          </div>
          <div
            className='tab-pane fade'
            id='pills-other'
            role='tabpanel'
            aria-labelledby='tab-other'
          >
            <div className='mb-4'>
              <form>
                <label htmlFor='customFile'>Profile Image</label>
                <input
                  type='file'
                  className='form-control'
                  id='profilePic'
                  onChange={onChangeAvatar}
                />
                <div className='text-center'>
                  <button className='btn btn-success mt-3' type='submit'>
                    <i className='fas fa-save' /> Update
                  </button>
                </div>
              </form>
            </div>

            <div className='mb-4'>
              <form>
                <label htmlFor='customFile'>Background Image</label>
                <input
                  type='file'
                  className='form-control'
                  id='backgroundPic'
                  onChange={onChangeBackGround}
                />
                <div className='text-center'>
                  <button className='btn btn-success mt-3' type='submit'>
                    <i className='fas fa-save' /> Update
                  </button>
                </div>
              </form>
            </div>

            <div className='text-center'>
              To change the password, click{' '}
              <Link to='/forgotpassword'>here</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

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
            onClick={() => setShow(true)}
          >
            <i className='fas fa-pencil-alt' /> Edit
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
      <Modal title='Update User' onClose={() => setShow(false)} show={show}>
        {form}
      </Modal>
    </Fragment>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
