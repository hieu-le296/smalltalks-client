import {
    GET_COMMENTS_OF_A_QUESTION,
    CLEAR_COMMENTS_WHEN_BACK,
    SET_CURRENT_COMMENT,
    CLEAR_CURRENT_COMMENT,
    COMMENT_ERROR,
    UPDATE_COMMENT
} from '../types';

const commentReducer = (state, action) => {
    switch (action.type) {

        case GET_COMMENTS_OF_A_QUESTION:
            return {
                ...state,
                comments: action.payload,
              };

        case CLEAR_COMMENTS_WHEN_BACK: 
        return {
            ...state,
            comments: []
        }

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
        
            case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };


        default:
            return state;

    }

}


export default commentReducer;