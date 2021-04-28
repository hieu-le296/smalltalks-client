import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AlertContext from '../../context/alert/alertContext';

const API_URL = 'https://datacomputation.com/api/v1/auth/resetpassword';

const ResetPassword = ({ match }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [isSent, setIsSent] = useState(false);

  const [passwords, setPasswords] = useState({
    password: '',
    password2: '',
  });

  const onChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === '' || password2 === '') {
      setAlert('Please enter all the fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords does not match', 'danger');
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const passwordObj = {
        password: password,
      };

      const resettoken = match.params.resettoken;

      try {
        await axios.put(`${API_URL}/${resettoken}`, passwordObj, config);

        setIsSent(true);
      } catch (err) {
        setAlert(err.response.data.error, 'danger');
      }
    }
  };

  const { password, password2 } = passwords;

  return (
    <Fragment>
      {isSent ? (
        <div className='card form-container'>
          <div className='form-container mt-5'>
            <p className='text-center'>
              <i className='fas fa-unlock fa-3x'></i>
            </p>
            <h1 className='text-center'>Reset Password</h1>
            <p className='text-center lead mt-3'>
              You have successfully reset password!
            </p>
            <Link to='/login' className='btn btn-primary btn-block mt-3'>
              Login now
            </Link>
          </div>
        </div>
      ) : (
        <div className='card form-container'>
          <div className='form-container mt-5'>
            <p className='text-center'>
              <i className='fas fa-unlock fa-3x'></i>
            </p>
            <h1 className='text-center'>Reset Password</h1>
            <form className='mt-5' onSubmit={onSubmit}>
              <div className='mb-4'>
                <label className='form-label' htmlFor='password'>
                  New Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  value={password}
                  autoFocus={true}
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
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ResetPassword;
