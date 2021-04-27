import React, { useState, useEffect, Fragment } from 'react';

import {
  getUsers,
  useUsers
} from '../../context/users/UserState';
import { useAuth } from '../../context/auth/AuthState';
import UserItem from '../users/auth/UserItem';
import Spinner from '../layout/Spinner';

const Users = () => {
    const [spinner, setSpinner] = useState(true);
  
    // We just need authState, so autState is at index 0
    const authState = useAuth()[0];
    const { isAuthenticated, user } = authState;
  
    const [usersState, userDispatch] = useUsers();
    const { users, filtered } = usersState;
  
    // Run once when re-render
    useEffect(() => {
      setTimeout(() => {
        setSpinner(false);
      }, 3000);
  
      if (user && isAuthenticated && user.data.role == 'admin') {
        getUsers(userDispatch);
      }
      // eslint-disable-next-line
    }, [user, isAuthenticated, setSpinner]);
  
    return (
      <Fragment>
        {spinner ? (
          <Spinner />
        ) : (
          <Fragment>
            {users!== null ? (
              <div style={userItemStyle}>
                {filtered !== null
                  ? filtered.map((userElement) => (
                 
                      <UserItem
                        key={user.userId}
                        id={user.userId}
                        user={userElement}
                      />
                    ))
                  : users.map((userElement) => (
                
                      <UserItem
                      key={user.userId}
                      id={user.userId}
                      user={userElement}
                      />
                    ))
                    }
              </div>
            ) : (
              <Spinner />
            )}
          </Fragment>
        )}
      </Fragment>
    );
  };

  const userItemStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)',
    gridGap: '1rem',
    marginTop: '2rem',
    textAlign: 'center'
  };
  
  
  export default Users;