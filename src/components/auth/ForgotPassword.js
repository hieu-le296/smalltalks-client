import React, { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const email = useRef('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email.current.value);
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default ForgotPassword;
