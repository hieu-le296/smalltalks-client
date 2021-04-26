import { GET_USERS, GET_USER, USER_ERROR, CLEAR_USER } from '../types';

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
