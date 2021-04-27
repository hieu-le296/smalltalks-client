import React, { useContext, useState, useRef, useEffect, Fragment } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import AlertContext from '../../../context/alert/alertContext';

import {
  useComment,
  setCurrentComment,
  clearCurrentComment,
  updateComment,
  deleteComment
} from '../../../context/comment/commentState';

import {useQuestions} from '../../../context/question/QuestionState';
import { useAuth } from '../../../context/auth/AuthState';

const API_URL = 'http://datacomputation.com/uploads/avatars';


const CommentItem = ({singleComment}) => {
  const [isEdit, setIsEdit] = useState(false);

  const [commentState, commentDispatch] = useComment();
  const {  error} = commentState;

  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;

  const [questionState, questionDispatch] = useQuestions();
  const { current } = questionState;


  const authState = useAuth()[0];
  const { isAuthenticated, user } = authState;

  // useEffect(() => {
  //  if ( error) {
  //    setIsEdit(false)
  //    setAlert(error, 'danger')
  //  }
   
  // }, [isEdit, error, setAlert])




    const comment = useRef('')

    const deleteSingleComment = async(e) => {

      e.preventDefault();

    const result =await deleteComment(commentDispatch,singleComment.commentId);

    setAlert(result,'warning');

  
    }

    const editComment = (e) => {
      e.preventDefault();

     
      let commentContent = comment.current.value.trim();

      console.log(commentContent);
     
      document.getElementById(`comment-${singleComment.commentId}-input`).focus();
      document.getElementById(`comment-${singleComment.commentId}-input`).readOnly = false;

      setIsEdit(true)

    };

    const saveComment = async(e) => {

      e.preventDefault();

      let commentContent = comment.current.value.trim();

    if (commentContent === ''){
      setAlert('Comment cannot be empty', 'danger')

    }
   

      let result = await updateComment(commentDispatch,{"content":commentContent},singleComment.commentId);
      if (result !== undefined && result) {
        setAlert(result, 'success')
        setIsEdit(false)
      }

      else if (error) {
        setAlert(error, 'danger')
      }
      
    
  }

    return (
        <div className="card " >
  <div className="card-header">
  <img
                  src={`${API_URL}/${singleComment.postedBy.profilePic}`}
                  alt='profile'
                  className='rounded-circle'
                  height='25'
                  loading='lazy'
                />{' '}
                {/* <Link to={`/users/${singleComment.postedBy.username}`}>
                  <strong> {singleComment.postedBy.username}</strong>
                </Link> */}

                <strong>{singleComment.postedBy.name}</strong>
  </div>
  <div className="card-body">
    <textarea className="card-text" id={`comment-${singleComment.commentId}-input`}  readOnly={true} ref={comment} >
      {singleComment.content}
    </textarea>
    { isAuthenticated && singleComment.postedBy.commentUserId == user.data.userId ?
    !isEdit ? (
      <Fragment>
      <button type="button" className="btn btn-secondary btn-sm me-3" onClick={editComment}><i className="fas fa-pencil-alt"></i> Edit</button>
      <button type="button" class="btn btn-danger btn-sm me-3" onClick={deleteSingleComment}><i class="fas fa-trash"></i> Delete</button>
      

      </Fragment>
    ) : (
      <Fragment>
        <button type="button" className="btn btn-success btn-sm me-3" onClick={saveComment}><i className="fas fa-save"></i> Save</button>
        <button type="button" class="btn btn-danger btn-sm me-3" onClick={deleteSingleComment}><i class="fas fa-trash"></i> Delete</button>
      
      </Fragment>
    ) 
    :
    ''
}
    
  </div>
  <div className="card-footer">{singleComment.createdAt}</div>
</div>
    );

}

CommentItem.propTypes = {
    singleComment: PropTypes.object.isRequired,
  };
  
  export default CommentItem;