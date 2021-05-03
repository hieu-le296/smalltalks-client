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
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  CLEAR_USER_ERRORS,
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
    return res.data.msg;
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

// Delete user
export const deleteUser = async (dispatch, userId) => {
  try {
    const res = await axios.delete(`${API_URL}/users/${userId}`);
    dispatch({ type: DELETE_USER, payload: userId });
    return res.data.msg;
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

// Set Current User
export const setCurrentUser = (dispatch, user) => {
  dispatch({ type: SET_CURRENT_USER, payload: user });
};

// Update Picture Profile
export const updateAvatar = async (dispatch, formData, userId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    await axios.put(`${API_URL}/auth/${userId}/profilepic`, formData, config);
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

// Update Background image
export const updateBackground = async (dispatch, formData, userId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    await axios.put(
      `${API_URL}/auth/${userId}/backgroundpic`,
      formData,
      config
    );
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

// Clear Current User
export const clearCurrentUser = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_USER });
};

// Clear User
export const clearUser = (dispatch) => {
  dispatch({ type: CLEAR_USER });
};

// Clear User Errors
export const clearUserErrors = (dispatch) => {
  dispatch({ type: CLEAR_USER_ERRORS });
};

const UserState = (props) => {
  const initState = {
    users: [],
    user: {},
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
