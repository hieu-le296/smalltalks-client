import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {
  useComment,
  getCommentsOfAPost,
} from '../../../context/comment/commentState';

import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

import { useAuth } from '../../../context/auth/AuthState';
import Spinner from '../../layout/Spinner';

const Comments = ({ postId }) => {
  const [spinner, setSpinner] = useState(true);

  // We just need authState, so autState is at index 0
  const authState = useAuth()[0];
  const { isAuthenticated } = authState;

  const [commentState, commentDisptach] = useComment();
  const { comments } = commentState;

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function showComments() {
      await getCommentsOfAPost(commentDisptach, postId, source.token);
      setSpinner(false);
    }
    showComments();

    return () => {
      source.cancel();
    };
  }, [postId, commentDisptach]);

  if (spinner) return <Spinner />;

  return (
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
  );
};

export default Comments;
