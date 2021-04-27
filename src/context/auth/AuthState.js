import React, { useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../auth/authContext';
import authReducer from '../auth/authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_ERROR,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const API_URL = 'https://datacomputation.com/api/v1';

// Create a custom hook to use the auth context

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

// Action creators
//   Load User
export const loadUser = async (dispatch) => {
  // Load token into global headers
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`${API_URL}/auth/me`);
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//   Register User
export const register = async (dispatch, formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${API_URL}/auth/register`, formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.error,
    });
  }
};

// Login User
export const login = async (dispatch, formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${API_URL}/auth/login`, formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.error,
    });
  }
};

// Update Auth user details
export const updateUser = async (dispatch, user, userId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`${API_URL}/users/${userId}`, user, config);
    await loadUser(dispatch);
    return res.data.msg;
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data.msg });
  }
};

// Update Picture Profile
export const updateAvatar = async (dispatch, formData, userId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.put(
      `${API_URL}/users/${userId}/profilepic`,
      formData,
      config
    );
    console.log(res);
    await loadUser(dispatch);
  } catch (err) {
    console.log(err.response);
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
    const res = await axios.put(
      `${API_URL}/users/${userId}/backgroundpic`,
      formData,
      config
    );
    await loadUser(dispatch);
    // dispatch({ type: UPDATE_AVATAR });
  } catch (err) {
    console.log(err.response);
  }
};

// Logout
export const logout = (dispatch) => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// AuthState Provider Component

const AuthState = (props) => {
  const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initState);

  // set token on initial app loading
  setAuthToken(state.token);

  // load user on first run or refresh
  if (state.loading) {
    loadUser(dispatch);
  }

  // 'watch' state.token and set headers and local storage on any change
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
