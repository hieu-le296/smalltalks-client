import React, { useState, useEffect, Fragment } from 'react';

import { getUsers, useUsers } from '../../context/users/UserState';
import { useAuth } from '../../context/auth/AuthState';
import UserItem from './users/UserItem';
import Spinner from '../layout/Spinner';
import UserModalAdd from './users/UserModalAdd';

const Users = () => {
  const [spinner, setSpinner] = useState(true);

  // We just need authState, so autState is at index 0
  const authState = useAuth()[0];
  const { isAuthenticated, user } = authState;

  const [usersState, userDispatch] = useUsers();
  const { users, current, filtered } = usersState;

  const [show, setShow] = useState(false);

  const onClickAddUser = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  // Run once when re-render
  useEffect(() => {
    async function getAllUsers() {
      if (user && isAuthenticated && user.data.role === 'admin') {
        await getUsers(userDispatch);
        setSpinner(false);
      }
    }
    getAllUsers();

    // eslint-disable-next-line
  }, [user, current, isAuthenticated, setSpinner]);

  const showFilterdUsers =
    filtered &&
    filtered.map((filter) => (
      <UserItem key={filter.userId} id={user.userId} user={filter} />
    ));

  const showUsers =
    user &&
    users.map((userElement) => (
      <UserItem
        key={userElement.userId}
        id={userElement.userId}
        user={userElement}
      />
    ));

  if (spinner) return <Spinner />;

  return (
    <Fragment>
      {
        <Fragment>
          <button
            type='button'
            className='btn btn-primary btn-floating float-btn'
            onClick={onClickAddUser}
          >
            <i className='fas fa-plus fa-lg' />
          </button>
          {users && (
            <div style={userItemStyle}>
              {filtered !== null ? showFilterdUsers : showUsers}
            </div>
          )}
        </Fragment>
      }
      <UserModalAdd title='Create A User' onClose={onClose} show={show} />
    </Fragment>
  );
};

const userItemStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)',
  gridGap: '1rem',
  marginTop: '2rem',
  textAlign: 'center',
};

export default Users;
