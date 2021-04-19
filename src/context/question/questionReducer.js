import {
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  SET_CURRENT_QUESTION,
  CLEAR_CURRENT_QUESTION,
  FILTER_QUESTIONS,
  CLEAR_FILTER,
} from '../types';

const questionReducer = (state, action) => {
  switch (action.type) {
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question.questionId !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default questionReducer;
