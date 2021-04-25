import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import QuestionContext from './questionContext';
import questionReducer from './questionReducer';
import {
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_QUESTIONS,
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  QUESTION_ERROR,
  CLEAR_QUESTIONS,
  SET_CURRENT_QUESTION,
  CLEAR_CURRENT_QUESTION,
  FILTER_QUESTIONS,
  CLEAR_FILTER,
} from '../types';

const API_URL = 'https://datacomputation.com/api/v1';

// Create a custom hook to use the contact context

export const useQuestions = () => {
  const { state, dispatch } = useContext(QuestionContext);
  return [state, dispatch];
};

// Action creator

// Get All Questions
export const getQuestions = async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/questions`);
    dispatch({ type: GET_QUESTIONS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

// Get single question
export const getQuestion = async (dispatch, slug) => {
  try {
    const res = await axios.get(`${API_URL}/questions/${slug}`);
    dispatch({ type: GET_QUESTION, payload: res.data.data });
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

// Get User Question
export const getUserQuestions = async (dispatch, username) => {
  try {
    const res = await axios.get(`${API_URL}/users/${username}/questions`);

    dispatch({ type: GET_USER_QUESTIONS, payload: res.data.questions });
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

//   Add Question
export const addQuestion = async (dispatch, question) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${API_URL}/questions`, question, config);
    dispatch({ type: ADD_QUESTION, payload: res.data.data });
    return res.data.msg;
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.data.error });
  }
};

// Update Question
export const updateQuestion = async (dispatch, question) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `${API_URL}/questions/${question.questionId}`,
      question,
      config
    );
    dispatch({ type: UPDATE_QUESTION, payload: res.data.data });
    return res.data.msg;
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

//   Delete Question
export const deleteQuestion = async (dispatch, questionId) => {
  try {
    await axios.delete(`${API_URL}/questions/${questionId}`);
    dispatch({ type: DELETE_QUESTION, payload: questionId });
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

// Set Current Question
export const setCurrent = (dispatch, question) => {
  dispatch({ type: SET_CURRENT_QUESTION, payload: question });
};

// Clear Current Question
export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_QUESTION });
};

// Filter Question
export const filterQuestions = (dispatch, text) => {
  dispatch({ type: FILTER_QUESTIONS, payload: text });
};

// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

// Clear questions
export const clearQuestions = (dispatch) => {
  dispatch({ type: CLEAR_QUESTIONS });
};

const QuestionState = (props) => {
  const initState = {
    questions: [],
    question: {},
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(questionReducer, initState);

  return (
    <QuestionContext.Provider value={{ state, dispatch }}>
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
