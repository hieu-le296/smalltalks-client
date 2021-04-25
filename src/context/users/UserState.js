import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import {
  GET_USERS
} from '../types';


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

const UserState = (props) => {
    const initState = {
      users: [],
      filtered: null
    };
  
    const [state, dispatch] = useReducer(userReducer, initState);
  
    return (
      <UserContext.Provider value={{ state, dispatch }}>
        {props.children}
      </UserContext.Provider>
    );
  };
  
  export default UserState;