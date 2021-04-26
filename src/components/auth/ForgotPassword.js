import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5700/api/v1/auth/forgotpassword';

const ForgotPassword = () => {
  const [isSent, setIsSent] = useState(false);
  const [msg, setMsg] = useState('');

  const email = useRef('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const emailObj = {
      email: email.current.value,
    };

    try {
      const result = await axios.post(API_URL, emailObj, config);

      setIsSent(true);
      setMsg(result.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Fragment>
      {isSent ? (
        <div className='card form-container'>
          <div className='form-container mt-5'>
            <h1 className='text-center'>Forgot Password?</h1>
            <p className='text-center lead mt-3'>{msg}</p>
            <Link to='/' className='btn btn-primary btn-block mt-3'>
              Go Home
            </Link>
          </div>
        </div>
      ) : (
        <div className='card form-container'>
          <div className='form-container mt-5'>
            <h1 className='text-center'>Forgot Password?</h1>
            <form className='mt-5' onSubmit={onSubmit}>
              <div className=' mb-4'>
                <label className='form-label' htmlFor='email'>
                  Email Address
                </label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  autoFocus={true}
                  required={true}
                  ref={email}
                />
              </div>

              <button type='submit' className='btn btn-primary btn-block mb-4'>
                Request Password
              </button>
              <div className='text-center'>
                <p>
                  Not a member? <Link to='/register'>Register now</Link>
                </p>

                <p>or</p>

                <p>
                  Already a member? <Link to='/login'>Login now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
