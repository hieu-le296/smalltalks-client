import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../../../context/alert/alertContext';

import {
  useComment,
  setCurrentComment,
  clearCurrentComment
} from '../../../context/comment/commentState';

const CommentItem = ({singleComment}) => {

  const [commentState, commentDispatch] = useComment();
  const { current, error} = commentState;

  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;

  // const [comment, setCurrent] = useState({
  //   content: ''
  // });



  // const {content} = comment;

  const comment = useRef('')

  // useEffect(() => {
  //   if (current !== null) {
  //     setCurrent(current);
  //   } else {
  //     setCurrent({
  //       content: '',
  //     });
  //   }
  // }, [current]);







    const editComment = () => {
      console.log(comment.current.value)
     
      document.getElementById(`comment-${singleComment.commentId}-input`).focus();
      document.getElementById(`comment-${singleComment.commentId}-input`).readOnly = false;
      


    };

    return (
        <div className="card " >
  <div className="card-header">{singleComment.postedBy.name}</div>
  <div className="card-body">
    <textarea className="card-text" id={`comment-${singleComment.commentId}-input`}  readOnly={true} ref={comment} >
      {singleComment.content}
    </textarea>
    
    <button type="button" className="btn btn-secondary btn-sm me-3" onClick={editComment}><i className="fas fa-pencil-alt"></i> Edit</button>
  </div>
  <div className="card-footer">{singleComment.createdAt}</div>
</div>
    );

}

CommentItem.propTypes = {
    singleComment: PropTypes.object.isRequired,
  };
  
  export default CommentItem;