import React, { Fragment, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import AlertContext from '../../../context/alert/alertContext';
import { useUsers, createUser } from '../../../context/users/UserState';

import '../../layout/Modal.css';

const UserModalAdd = (props) => {
  const [userState, userDispatch] = useUsers();
  const { error } = userState;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
    }

    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [error]);

  const onClose = (e) => {
    props.onClose();

    setUser({
      name: '',
      username: '',
      email: '',
      role: '',
      password: '',
      password2: '',
    });
  };

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
    password: '',
    password2: '',
  });

  const { name, username, email, role, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || username === '' || password === '') {
      setAlert('Please enter all the fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords does not match', 'danger');
    } else if (role === '') {
      setAlert('Please select a role type', 'danger');
    } else {
      const msg = await createUser(userDispatch, {
        name,
        username,
        email,
        password,
        role,
      });
      if (msg) {
        setAlert(msg, 'success');
      }
      onClose();
    }
  };

  const form = (
    <Fragment>
      <form className='form-container' onSubmit={onSubmit}>
        <div className='mb-4'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            value={name}
            onChange={onChange}
            autoFocus={true}
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

        <p>Set User Password</p>

        <div className='row mb-4'>
          <div className='col'>
            <input
              type='password'
              className='form-control'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Password'
            />
          </div>
          <div className='col'>
            <input
              type='password'
              className='form-control'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm Password'
            />
          </div>
        </div>

        <div className='mb-4'>
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

            <label className='form-check-label' htmlFor='inlineRadio1'>
              User
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='role'
              checked={role === 'admin'}
              id='inlineRadio2'
              value='admin'
              onChange={onChange}
            />
            <label className='form-check-label' htmlFor='inlineRadio2'>
              Admin
            </label>
          </div>
        </div>

        <button type='submit' className='btn btn-success btn-rounded btn-block'>
          <i className='fas fa-plus fa-lg' /> Create a user
        </button>
      </form>
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
            <button onClick={onClose} className='btn btn-rounded btn-warning'>
              <i className='fas fa-times' /> Cancel
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
};

export default UserModalAdd;
