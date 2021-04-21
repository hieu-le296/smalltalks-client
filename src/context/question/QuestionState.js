import React, { useReducer, useCallback } from 'react';
import axios from 'axios';
import QuestionContext from './questionContext';
import questionReducer from './questionReducer';
import {
  GET_QUESTIONS,
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

const QuestionState = (props) => {
  const initState = {
    questions: [],
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(questionReducer, initState);

  // Get All Questions
  const getQuestions = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/questions`);
      dispatch({ type: GET_QUESTIONS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
    }
  }, []);

  // Get User Question
  const getUserQuestions = useCallback(async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/users/${userId}/questions`);

      dispatch({ type: GET_USER_QUESTIONS, payload: res.data.questions });
    } catch (err) {
      dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
    }
  }, []);

  //   Add Question
  const addQuestion = async (question) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`${API_URL}/questions`, question, config);
      dispatch({ type: ADD_QUESTION, payload: res.data });
    } catch (err) {
      dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
    }
  };

  // Update Question
  const updateQuestion = (question) => {
    dispatch({ type: UPDATE_QUESTION, payload: question });
  };

  //   Delete Question
  const deleteQuestion = (questionId) => {
    dispatch({ type: DELETE_QUESTION, payload: questionId });
  };

  // Set Current Question
  const setCurrent = (question) => {
    dispatch({ type: SET_CURRENT_QUESTION, payload: question });
  };

  // Clear Current Question
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT_QUESTION });
  };

  // Filter Question
  const filterQuestions = (text) => {
    dispatch({ type: FILTER_QUESTIONS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <QuestionContext.Provider
      value={{
        questions: state.questions,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getQuestions,
        getUserQuestions,
        addQuestion,
        setCurrent,
        updateQuestion,
        clearCurrent,
        deleteQuestion,
        filterQuestions,
        clearFilter,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
