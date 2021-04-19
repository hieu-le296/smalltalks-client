import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import QuestionContext from './questionContext';
import questionReducer from './questionReducer';
import {
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  SET_CURRENT_QUESTION,
  CLEAR_CURRENT_QUESTION,
  FILTER_QUESTIONS,
  CLEAR_FILTER,
} from '../types';

const QuestionState = (props) => {
  const initState = {
    questions: [
      {
        questionId: 1,
        postedBy: {
          userId: 1,
          username: 'johndoe',
          name: 'John Doe',
        },
        title: 'testing..',
        content: 'updating this one',
        createdAt: '2021-04-12T03:45:31.000Z',
        updatedAt: '2021-04-12T06:56:16.000Z',
      },
      {
        questionId: 2,
        postedBy: {
          userId: 1,
          username: 'johndoe',
          name: 'John Doe',
        },
        title: 'Test Question',
        content: 'UFV',
        createdAt: '2021-04-12T03:45:31.000Z',
        updatedAt: '2021-04-12T06:49:35.000Z',
      },

      {
        questionId: 3,
        postedBy: {
          userId: 2,
          username: 'marysmith2',
          name: 'Mary Smith',
        },
        title: 'BC vs. Ontario regarding the tech jobs',
        content:
          'Hi, I am about to graduate soon! I want to know whether there are more tech jobs in Ontario. I am living in BC now.',
        createdAt: '2021-04-12T03:45:31.000Z',
        updatedAt: '2021-04-12T03:45:31.000Z',
      },

      {
        questionId: 4,
        postedBy: {
          userId: 3,
          username: 'hieule',
          name: 'Hieu Le',
        },
        title: 'What’s your favorite color?',
        content: 'For me, I like blue. How about you, guys?',
        createdAt: '2021-04-12T03:45:31.000Z',
        updatedAt: '2021-04-12T03:45:31.000Z',
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(questionReducer, initState);

  //   Add Question
  const addQuestion = (question) => {
    question.questionId = uuid();
    dispatch({ type: ADD_QUESTION, payload: question });
  };

  //   Delete Question
  const deleteQuestion = (questionId) => {
    dispatch({ type: DELETE_QUESTION, payload: questionId });
  };

  // Set Current Question
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT_QUESTION, payload: contact });
  };

  // Clear Current Question
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT_QUESTION });
  };

  // Update Question

  // Filter Question

  // Clear Filter

  return (
    <QuestionContext.Provider
      value={{
        questions: state.questions,
        current: state.current,
        addQuestion,
        setCurrent,
        clearCurrent,
        deleteQuestion,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
