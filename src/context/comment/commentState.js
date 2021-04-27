import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import CommentContext from './commentContext';
import commentReducer from './commentReducer';

import {
  GET_COMMENTS_OF_A_QUESTION,
  CLEAR_COMMENTS_WHEN_BACK,
  SET_CURRENT_COMMENT,
  CLEAR_CURRENT_COMMENT,
  UPDATE_COMMENT,
  COMMENT_ERROR,
  DELETE_COMMENT,
  ADD_COMMENT,
} from '../types';

const API_URL = 'https://datacomputation.com/api/v1';

// Create a custom hook to use the contact context
export const useComment = () => {
  const { state, dispatch } = useContext(CommentContext);
  return [state, dispatch];
};

// Get All Questions
export const getCommentsOfAQuestion = async (dispatch, questionId) => {
  try {
    const res = await axios.get(`${API_URL}/questions/${questionId}/comments`);
    dispatch({ type: GET_COMMENTS_OF_A_QUESTION, payload: res.data.data });
  } catch (err) {
    //dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
    console.log(err);
  }
};

// Update Comment
export const updateComment = async (dispatch, comment, commentId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `${API_URL}/comments/${commentId}`,
      comment,
      config
    );
    dispatch({ type: UPDATE_COMMENT, payload: res.data.data });
    return res.data.msg;
  } catch (err) {
    // console.log(err.response.data.error);
    dispatch({ type: COMMENT_ERROR, payload: err.response.data.error });
  }
};

//   Delete Comment
export const deleteComment = async (dispatch, commentId) => {
  try {
    const res = await axios.delete(`${API_URL}/comments/${commentId}`);
    dispatch({ type: DELETE_COMMENT, payload: commentId });
    return res.data.msg;
  } catch (err) {
    dispatch({ type: COMMENT_ERROR, payload: 'err' });
  }
};

//   Add Comment
export const addComment = async (dispatch, questionId, commentData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `${API_URL}/questions/${questionId}/comments`,
      commentData,
      config
    );
    dispatch({ type: ADD_COMMENT, payload: res.data.data });
    return res.data.msg;
  } catch (err) {
    dispatch({ type: COMMENT_ERROR, payload: err.response.data.error });
  }
};

export const clearCommentsWhenBack = (dispatch) => {
  dispatch({ type: CLEAR_COMMENTS_WHEN_BACK });
};

// Set Current Comment
export const setCurrentComment = (dispatch, comment) => {
  dispatch({ type: SET_CURRENT_COMMENT, payload: comment });
};

// Clear Current Comment
export const clearCurrentComment = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_COMMENT });
};

const CommentState = (props) => {
  const initState = {
    comments: [],
    comment: {},
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(commentReducer, initState);

  return (
    <CommentContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentState;
