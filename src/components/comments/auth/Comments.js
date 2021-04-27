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
  const { isAuthenticated, user } = authState;

  const [commentState, commentDisptach] = useComment();
  const { comments } = commentState;

  // Run once when re-render
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 1000);

    getCommentsOfAQuestion(commentDisptach, questionId);

    // eslint-disable-next-line
  }, [user, isAuthenticated, setSpinner]);

  return (
    <Fragment>
      {spinner ? (
        <Spinner />
      ) : (
        <Fragment>
          {isAuthenticated && <CommentForm />}
          <h3>Comments</h3>
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
