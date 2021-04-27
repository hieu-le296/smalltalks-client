import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { useUsers, getUser, clearUser } from '../../../context/users/UserState';
import {
  useQuestions,
  clearQuestions,
} from '../../../context/question/QuestionState';

const API_URL = 'https://datacomputation.com/uploads';

const PublicProfile = ({ username }) => {
  const [userState, userDispatch] = useUsers();

  const { user } = userState;

  const questionDispatch = useQuestions()[1];

  useEffect(() => {
    getUser(userDispatch, username);
  }, [username, userDispatch]);

  const onBackHome = () => {
    clearUser(userDispatch);
    clearQuestions(questionDispatch);
  };

  return (
    <Fragment>
      {!user ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/' className='btn btn-light mt-5' onClick={onBackHome}>
            <i className='fas fa-angle-double-left'></i> Back to Home
          </Link>
          <div className=' d-flex flex-column justify-content-start align-items-center'>
            <div className='align-self-center' style={{ maxWidth: '50%' }}>
              <img
                src={user && `${API_URL}/backgrounds/${user.backgroundPic}`}
                className='img-fluid shadow-2-strong background-pic'
                alt='...'
                loading='lazy'
              />
            </div>
            <div>
              <img
                src={user && `${API_URL}/avatars/${user.profilePic}`}
                className='rounded-circle shadow-2-strong profile-pic'
                height='150'
                width='150'
                alt=''
                loading='lazy'
              />
            </div>
            <h1 className='mt-3'>{user.name}</h1>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PublicProfile;
