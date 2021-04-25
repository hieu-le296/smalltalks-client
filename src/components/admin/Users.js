import React, { useState, useEffect, Fragment } from 'react';

import {
  getUsers,
  useUsers
} from '../../context/users/UserState';
import { useAuth } from '../../context/auth/AuthState';
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
  
      if (user && isAuthenticated) {
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
              <Fragment>
                {filtered !== null
                  ? filtered.map((userElement) => (
                      <h3>{userElement.username}</h3>
                    //   <QuestionItem
                    //     key={user.userId}
                    //     id={user.userId}
                    //     question={question}
                    //   />
                    ))
                  : users.map((userElement) => (
                      <h3>{userElement.username}</h3>
                    //   <QuestionItem
                    //     key={question.questionId}
                    //     id={question.questionId}
                    //     question={question}
                    //   />
                    ))
                    }
              </Fragment>
            ) : (
              <Spinner />
            )}
          </Fragment>
        )}
      </Fragment>
    );
  };
  
  export default Users;