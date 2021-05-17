import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { useUsers, getUser, clearUser } from '../../../context/users/UserState';
import { usePosts, clearPosts } from '../../../context/post/PostState';

const PublicProfile = ({ username }) => {
  const [spinner, setSpinner] = useState(true);

  const [userState, userDispatch] = useUsers();

  const { user } = userState;

  const postDispatch = usePosts()[1];

  useEffect(() => {
    async function fetchUser() {
      await getUser(userDispatch, username);
      setSpinner(false);
    }
    fetchUser();
  }, [username, userDispatch]);

  const onBackHome = () => {
    clearUser(userDispatch);
    clearPosts(postDispatch);
  };

  if (spinner) return <Spinner />;

  return (
    <Fragment>
      <Link
        to='/'
        className='btn btn-light btn-rounded mt-5 mb-5'
        onClick={onBackHome}
      >
        <i className='fas fa-angle-double-left'></i> Back to Home
      </Link>
      <div className='container-fluid text-center'>
        <div>
          <img
            src={
              user &&
              `${process.env.REACT_APP_API_URL}/uploads/backgrounds/${user.backgroundPic}`
            }
            className='img-fluid shadow-2-strong rounded img-thumbnail background-pic'
            alt='...'
            loading='lazy'
            style={{ maxWidth: '75%' }}
          />
        </div>
        <div>
          <img
            src={
              user &&
              `${process.env.REACT_APP_API_URL}/uploads/avatars/${user.profilePic}`
            }
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
  );
};

export default PublicProfile;
