import {
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_QUESTIONS,
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  CLEAR_QUESTIONS,
  CLEAR_QUESTION,
  SET_CURRENT_QUESTION,
  CLEAR_CURRENT_QUESTION,
  FILTER_QUESTIONS,
  CLEAR_FILTER,
  QUESTION_ERROR,
} from '../types';

const questionReducer = (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
    case GET_USER_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };

    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };

    case UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.questionId === action.payload.questionId
            ? action.payload
            : question
        ),
      };

    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question.questionId !== action.payload
        ),
      };

    case CLEAR_QUESTIONS:
      return {
        ...state,
        questions: [],
        filtered: null,
        error: null,
        current: null,
      };

    case CLEAR_QUESTION:
      return {
        ...state,
        questions: [],
        question: {},
        filtered: null,
        error: null,
        current: null,
      };

    case SET_CURRENT_QUESTION:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT_QUESTION:
      return {
        ...state,
        current: null,
      };

    case FILTER_QUESTIONS:
      return {
        ...state,
        filtered: state.questions.filter((question) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return question.title.match(regex) || question.content.match(regex);
        }),
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case QUESTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default questionReducer;
