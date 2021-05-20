import {
  GET_COMMENTS_OF_A_POST,
  CLEAR_COMMENTS_WHEN_BACK,
  SET_CURRENT_COMMENT,
  CLEAR_CURRENT_COMMENT,
  GET_COMMENTS_ERROR,
  COMMENT_ERROR,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT,
} from '../types';

const commentReducer = (state, action) => {
  switch (action.type) {
    case GET_COMMENTS_OF_A_POST:
      return {
        ...state,
        comments: action.payload,
      };

    case CLEAR_COMMENTS_WHEN_BACK:
      return {
        ...state,
        comments: [],
        comment: {},
      };

    case SET_CURRENT_COMMENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT_COMMENT:
      return {
        ...state,
        current: null,
      };

    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.commentId === action.payload.commentId
            ? action.payload
            : comment
        ),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.commentId !== action.payload
        ),
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };

    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case GET_COMMENTS_ERROR: {
      return {
        ...state,
        error: action.payload,
        comments: [],
        comment: {},
        current: null,
      };
    }

    default:
      return state;
  }
};

export default commentReducer;
