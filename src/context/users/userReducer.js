import {
  GET_USERS,
  GET_USER,
  USER_ERROR,
  CLEAR_USER,
  UPDATE_USER,
  CREATE_USER,
  DELETE_USER,
} from '../types';

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case CREATE_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.userId === action.payload.userId ? action.payload : user
        ),
        user: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.userId !== action.payload),
      };
    case CLEAR_USER: {
      return {
        ...state,
        user: null,
      };
    }

    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
