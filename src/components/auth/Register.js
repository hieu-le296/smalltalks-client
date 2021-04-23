import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    if (error !== null) {
      setAlert('User already Exits!', 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, username, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || username === '' || password === '') {
      setAlert('Please enter all the fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords doe not match', 'danger');
    } else {
      register({
        name,
        username,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container mt-5'>
      <h1 className='text-center'>Account Register</h1>
      <form className='mt-5' onSubmit={onSubmit}>
        <div className=' mb-4'>
          <label htmlFor='name'>Your Name</label>
          <input
            type='text'
            className='form-control'
            name='name'
            value={name}
            onChange={onChange}
          />
        </div>

        <div className=' mb-4'>
          <label className='form-label' htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            className='form-control'
            name='username'
            value={username}
            onChange={onChange}
          />
        </div>

        <div className=' mb-4'>
          <label className='form-label' htmlFor='email'>
            Email Address
          </label>
          <input
            type='text'
            className='form-control'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>

        <div className='mb-4'>
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>

        <div className='mb-5'>
          <label className='form-label' htmlFor='password2'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>

        <button type='submit' className='btn btn-primary btn-block mb-4'>
          Submit
        </button>
        <div className='text-center'>
          <p>
            Have an account? <Link to='/login'>Login now</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
