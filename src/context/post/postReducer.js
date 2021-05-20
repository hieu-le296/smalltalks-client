import {
  GET_POSTS,
  GET_POST,
  GET_USER_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  CLEAR_POSTS,
  CLEAR_POST,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  FILTER_POSTS,
  CLEAR_FILTER,
  POST_ERROR,
  CLEAR_POST_ERROR,
} from '../types';

const postReducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
    case GET_USER_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.postId === action.payload.postId ? action.payload : post
        ),
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.postId !== action.payload),
      };

    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        filtered: null,
        error: null,
        current: null,
      };

    case CLEAR_POST:
      return {
        ...state,
        posts: [],
        post: {},
        filtered: null,
        error: null,
        current: null,
      };

    case SET_CURRENT_POST:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT_POST:
      return {
        ...state,
        current: null,
      };

    case FILTER_POSTS:
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

    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_POST_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default postReducer;
