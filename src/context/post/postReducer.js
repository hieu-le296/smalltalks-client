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
  CLEAR_QUESTION_ERROR,
} from '../types';

const postReducer = (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
    case GET_USER_QUESTIONS:
      return {
        ...state,
        posts: action.payload,
      };

    case GET_QUESTION:
      return {
        ...state,
        post: action.payload,
      };

    case ADD_QUESTION:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case UPDATE_QUESTION:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.postId === action.payload.postId ? action.payload : post
        ),
      };

    case DELETE_QUESTION:
      return {
        ...state,
        posts: state.posts.filter((post) => post.postId !== action.payload),
      };

    case CLEAR_QUESTIONS:
      return {
        ...state,
        posts: [],
        filtered: null,
        error: null,
        current: null,
      };

    case CLEAR_QUESTION:
      return {
        ...state,
        posts: [],
        post: {},
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
        filtered: state.posts.filter((post) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return post.title.match(regex) || post.content.match(regex);
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

    case CLEAR_QUESTION_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default postReducer;
