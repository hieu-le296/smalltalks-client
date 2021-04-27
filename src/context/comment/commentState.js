import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import CommentContext from './commentContext';
import commentReducer from './commentReducer';

import { GET_COMMENTS_OF_A_QUESTION, CLEAR_COMMENTS_WHEN_BACK,SET_CURRENT_COMMENT,
  CLEAR_CURRENT_COMMENT } from '../types';

const API_URL = 'https://datacomputation.com/api/v1';

// Create a custom hook to use the contact context
export const useComment = () => {
  const { state, dispatch } = useContext(CommentContext);
  return [state, dispatch];
};

// Get All Questions
export const getCommentsOfAQuestion = async (dispatch,questionId) => {
  try {
    const res = await axios.get(`${API_URL}/questions/${questionId}/comments`);
    dispatch({ type: GET_COMMENTS_OF_A_QUESTION, payload: res.data.data });
  } catch (err) {
    //dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
    console.log(err);
  }
};

export const clearCommentsWhenBack = (dispatch) => {
  dispatch({type : CLEAR_COMMENTS_WHEN_BACK})
}


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
    comment : {},
    current : null,
    error: null
  };

  const [state, dispatch] = useReducer(commentReducer, initState);

  return (
    <CommentContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentState;
