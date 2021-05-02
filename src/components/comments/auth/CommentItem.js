import React, { useContext, useState, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AlertContext from '../../../context/alert/alertContext';

import {
  useComment,
  updateComment,
  deleteComment,
} from '../../../context/comment/commentState';

import { useAuth } from '../../../context/auth/AuthState';

const API_URL = 'http://datacomputation.com/uploads/avatars';

const CommentItem = ({ singleComment }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [commentState, commentDispatch] = useComment();
  const { error } = commentState;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authState = useAuth()[0];
  const { isAuthenticated, user } = authState;

  const comment = useRef('');

  const deleteSingleComment = async (e) => {
    e.preventDefault();

    const result = await deleteComment(
      commentDispatch,
      singleComment.commentId
    );

    setAlert(result, 'warning');
  };

  const editComment = (e) => {
    e.preventDefault();

    document.getElementById(`comment-${singleComment.commentId}-input`).focus();
    document.getElementById(
      `comment-${singleComment.commentId}-input`
    ).readOnly = false;

    setIsEdit(true);
  };

  const saveComment = async (e) => {
    e.preventDefault();

    let commentContent = comment.current.value.trim();

    if (commentContent === '') {
      setAlert('Comment cannot be empty', 'danger');
    }

    let result = await updateComment(
      commentDispatch,
      { content: commentContent },
      singleComment.commentId
    );
    if (result !== undefined && result) {
      setAlert(result, 'success');
      setIsEdit(false);
    } else if (error) {
      setAlert(error, 'danger');
    }
  };

  return (
    <Fragment>
      <div className='mt-5'>
        <img
          src={`${API_URL}/${singleComment.postedBy.profilePic}`}
          alt='profile'
          className='rounded-circle'
          height='40'
          width='40'
          loading='lazy'
        />{' '}
        <div className='card comment-card'>
          <Link
            to={`/users/${singleComment.postedBy.username}`}
            className='mx-3 mt-2'
          >
            <strong> {singleComment.postedBy.name}</strong>
          </Link>
          <div className='card-body'>
            <textarea
              className='card-text'
              id={`comment-${singleComment.commentId}-input`}
              readOnly={true}
              ref={comment}
            >
              {singleComment.content}
            </textarea>
            {(isAuthenticated &&
              singleComment.postedBy.commentUserId === user.data.userId) ||
            (isAuthenticated && user.data.role === 'admin') ? (
              !isEdit ? (
                <Fragment>
                  <button
                    type='button'
                    className='btn btn-secondary btn-rounded btn-sm me-3'
                    onClick={editComment}
                  >
                    <i className='fas fa-pencil-alt'></i> Edit
                  </button>
                  <button
                    type='button'
                    className='btn btn-danger btn-rounded btn-sm me-3'
                    onClick={deleteSingleComment}
                  >
                    <i className='fas fa-trash'></i> Delete
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <button
                    type='button'
                    className='btn btn-success btn-rounded btn-sm me-3'
                    onClick={saveComment}
                  >
                    <i className='fas fa-save'></i> Save
                  </button>
                  <button
                    type='button'
                    className='btn btn-danger btn-rounded btn-sm me-3'
                    onClick={deleteSingleComment}
                  >
                    <i className='fas fa-trash'></i> Delete
                  </button>
                </Fragment>
              )
            ) : (
              ''
            )}
          </div>
          <div className='card-footer'>
            <i className='fas fa-edit'></i>{' '}
            {new Date(`${singleComment.updatedAt}`).toLocaleString()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.propTypes = {
  singleComment: PropTypes.object.isRequired,
};

export default CommentItem;
