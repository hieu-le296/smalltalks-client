import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth, clearErrors, login } from '../../context/auth/AuthState';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }
    if (error !== null) {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history, setAlert]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login(authDispatch, {
        email,
        password,
      });
    }
  };

  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <div className='form-container mt-5'>
      <h1 className='text-center'>Account Log in</h1>
      <form className='mt-5' onSubmit={onSubmit}>
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

        <div className='text-center mb-5'>
          <a href='#!'>Forgot password?</a>
        </div>

        <button type='submit' className='btn btn-primary btn-block mb-4'>
          Sign in
        </button>
        <div className='text-center'>
          <p>
            Not a member? <Link to='/register'>Register now</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
