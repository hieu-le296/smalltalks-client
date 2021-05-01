import React, { useState, useEffect, Fragment } from 'react';
import {
  useComment,
  getCommentsOfAQuestion,
} from '../../../context/comment/commentState';

import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

import { useAuth } from '../../../context/auth/AuthState';
import Spinner from '../../layout/Spinner';

const Comments = ({ questionId }) => {
  const [spinner, setSpinner] = useState(true);

  // We just need authState, so autState is at index 0
  const authState = useAuth()[0];
  const { isAuthenticated } = authState;

  const [commentState, commentDisptach] = useComment();
  const { comments } = commentState;

  // Run once when re-render
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 1000);

    // eslint-disable-next-line
  }, [setSpinner]);

  useEffect(() => {
    getCommentsOfAQuestion(commentDisptach, questionId);
  }, [comments, questionId, commentDisptach]);

  return (
    <Fragment>
      {spinner ? (
        <Spinner />
      ) : (
        <Fragment>
          {isAuthenticated && <CommentForm />}

          {comments.length === 0 ? (
            <h3>
              {' '}
              <i className='far fa-comment' /> 0 Comment
            </h3>
          ) : (
            <h3 className=''>
              <i className='far fa-comment' /> {comments.length} Comments
            </h3>
          )}
          {comments.map((singleComment) => {
            return (
              <CommentItem
                singleComment={singleComment}
                key={singleComment.commentId}
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Comments;
