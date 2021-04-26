import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import { GET_USERS, GET_USER, CLEAR_USER, USER_ERROR } from '../types';

const API_URL = 'https://datacomputation.com/api/v1';

// Create a custom hook to use the contact context

export const useUsers = () => {
  const { state, dispatch } = useContext(UserContext);
  return [state, dispatch];
};

// Get All Questions
export const getUsers = async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    dispatch({ type: GET_USERS, payload: res.data.data });
  } catch (err) {
    //dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

// Get All Users

// Get User
export const getUser = async (dispatch, userName) => {
  try {
    const res = await axios.get(`${API_URL}/users/${userName}`);
    dispatch({ type: GET_USER, payload: res.data.data });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

// Create a User

// Update User

// Delete user

// Clear Current User

// Clear User
export const clearUser = (dispatch) => {
  dispatch({ type: CLEAR_USER });
};

const UserState = (props) => {
  const initState = {
    users: [],
    user: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
