import React, { Fragment, useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import '../../layout/Modal.css';

import {
  useUsers,
  getUsers,
  updateUser,
  updateAvatar,
  updateBackground,
  clearCurrentUser,
  clearUser,
  clearUserErrors,
} from '../../../context/users/UserState';
import AlertContext from '../../../context/alert/alertContext';

const API_URL = 'http://datacomputation.com/uploads';

const UserModal = (props) => {
  const [userState, userDispatch] = useUsers();
  const { current, error } = userState;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
  });

  const { name, username, email, role } = user;

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
      clearCurrentUser(userDispatch);
      clearUser(userDispatch);
      getUsers(userDispatch);
    }
  };

  const onClose = (e) => {
    props.onClose();
    clearCurrentUser(userDispatch);
    clearUser(userDispatch);
    getUsers(userDispatch);
  };

  useEffect(() => {
    if (current !== null) {
      setUser(current);
      console.log(current);
    } else {
      setUser({
        name: '',
        username: '',
        email: '',
      });
    }

    if (error) {
      setAlert(error, 'danger');
    }

    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [current, error]);

  const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let msg = await updateUser(userDispatch, user);
    console.log(msg);
    if (msg) {
      setAlert(msg, 'success');
    }

    if (error !== null) {
      setAlert(error, 'danger');
      clearUserErrors(userDispatch);
    }
  };

  const onChangeAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const onChangeBackGround = (e) => {
    setBackground(e.target.files[0]);
  };

  const onSubmitAvatar = async (e) => {
    e.preventDefault();
    if (avatar === '') {
      setAlert('Please select an image', 'danger');
    } else {
      const formData = new FormData();
      formData.append('file', avatar);

      try {
        await updateAvatar(userDispatch, formData, current.userId);
        setAlert('Profile Image successfully updated!', 'success');
        onClose();
      } catch (err) {
        if (error !== null) {
          setAlert(error, 'danger');
          clearUserErrors(userDispatch);
        }
      }
    }
  };

  const onSubmitBackground = async (e) => {
    e.preventDefault();

    if (background === '') {
      setAlert('Please select an image', 'danger');
    } else {
      try {
        const formData = new FormData();
        formData.append('file', background);
        await updateBackground(userDispatch, formData, current.userId);
        onClose();
        setAlert('Background Image successfully updated!', 'success');
      } catch (err) {
        if (error !== null) {
          setAlert(error, 'danger');
          clearUserErrors(userDispatch);
        }
      }
    }
  };

  const form = (
    <Fragment>
      <div className='container-fluid text-center'>
        <div>
          <img
            src={current && `${API_URL}/backgrounds/${current.backgroundPic}`}
            className='img-fluid shadow-2-strong background-pic'
            alt='...'
            style={{ maxWidth: '75%' }}
          />
        </div>
        <div>
          <img
            src={current && `${API_URL}/avatars/${current.profilePic}`}
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
            <form onSubmit={onSubmit}>
              <div className='mb-4'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className=' mb-4'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  className='form-control'
                  name='username'
                  value={username}
                  onChange={onChange}
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
              </div>
              <p className='mb-4'>
                Role:
                <div className='form-check form-check-inline mx-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='role'
                    id='inlineRadio1'
                    checked={role === 'user'}
                    value='user'
                    onChange={onChange}
                  />

                  <label className='form-check-label' for='inlineRadio1'>
                    User
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='role'
                    id='inlineRadio2'
                    checked={role === 'admin'}
                    value='admin'
                    onChange={onChange}
                  />
                  <label className='form-check-label' for='inlineRadio2'>
                    Admin
                  </label>
                </div>
              </p>

              <button
                type='submit'
                className='btn btn-success btn-rounded btn-lg btn-block'
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
              <form onSubmit={onSubmitAvatar}>
                <label htmlFor='customFile'>Profile Image</label>
                <input
                  type='file'
                  className='form-control'
                  id='profilePic'
                  onChange={onChangeAvatar}
                />
                <div className='text-center'>
                  <button
                    className='btn btn-success btn-rounded mt-3'
                    type='submit'
                  >
                    <i className='fas fa-save' /> Update
                  </button>
                </div>
              </form>
            </div>

            <div className='mb-4'>
              <form onSubmit={onSubmitBackground}>
                <label htmlFor='customFile'>Background Image</label>
                <input
                  type='file'
                  className='form-control'
                  id='backgroundPic'
                  onChange={onChangeBackGround}
                />
                <div className='text-center'>
                  <button
                    className='btn btn-success btn-rounded mt-3'
                    type='submit'
                  >
                    <i className='fas fa-save' /> Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className='modal' onClick={onClose}>
        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
          <div className='modal-header'>
            <h4 className='modal-title'>{props.title}</h4>
          </div>
          <div className='modal-body'>{form}</div>
          <div className='modal-footer'>
            <button onClick={onClose} className='btn btn-warning'>
              <i className='fas fa-times' /> Cancel
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
};

export default UserModal;
