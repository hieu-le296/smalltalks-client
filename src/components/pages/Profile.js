import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';

const API_URL = 'http://datacomputation.com/uploads';

const Profile = () => {
  const [authState, authStateDispatch] = useAuth();
  const { user } = authState;

  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
  });

  const { name, username, email } = profile;

  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      {!user ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className=' d-flex flex-column justify-content-start align-items-center'>
            <div className='align-self-center' style={{ maxWidth: '50%' }}>
              <img
                src={
                  user && `${API_URL}/backgrounds/${user.data.backgroundPic}`
                }
                className='img-fluid shadow-2-strong background-pic'
                alt='...'
              />
            </div>
            <div>
              <img
                src={user && `${API_URL}/avatars/${user.data.profilePic}`}
                className='rounded-circle shadow-2-strong profile-pic'
                height='150'
                alt=''
                loading='lazy'
                onError={(e) => (e.style.visibility = 'hidden')}
              />
            </div>
            <h1 className='mt-3'>{user.data.name}</h1>
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
                      placeholder={user.data.name}
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
                      placeholder={user.data.username}
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
                      placeholder={user.data.email}
                    />
                  </div>

                  <button type='submit' className='btn btn-info btn-block mb-4'>
                    Update Profile
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
                  <label htmlFor='customFile'>Profile Image</label>

                  <input type='file' className='form-control' id='profilePic' />

                  <button className='btn btn-info mt-3' type='submit'>
                    Update
                  </button>
                </div>

                <div className='mb-4'>
                  <label htmlFor='customFile'>Background Image</label>
                  <input
                    type='file'
                    className='form-control'
                    id='backgroundPic'
                  />
                  <button className='btn btn-info mt-3' type='submit'>
                    Update
                  </button>
                </div>

                <div className='text-center mb-5'>
                  To change the password, click{' '}
                  <Link to='/forgotpassword'>here</Link>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
