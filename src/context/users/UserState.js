import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import {
  GET_USERS,
  GET_USER,
  CLEAR_USER,
  USER_ERROR,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../types';

const API_URL = 'https://datacomputation.com/api/v1';

// Create a custom hook to use the contact context

export const useUsers = () => {
  const { state, dispatch } = useContext(UserContext);
  return [state, dispatch];
};

// Get All Users
export const getUsers = async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    dispatch({ type: GET_USERS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

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
export const createUser = async (dispatch, formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`${API_URL}/users`, formData, config);
    dispatch({ type: CREATE_USER, payload: res.data.data });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

// Update User
export const updateUser = async (dispatch, user) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `${API_URL}/users/${user.userId}`,
      user,
      config
    );
    dispatch({ type: UPDATE_USER, payload: res.data.data });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

// Delete user
export const deleteUser = async (dispatch, userId) => {
  try {
    const res = await axios.delete(`${API_URL}/users/${userId}`);
    dispatch({ type: DELETE_USER, payload: res.data.data });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

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
