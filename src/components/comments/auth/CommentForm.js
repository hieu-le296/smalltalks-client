import React, { useRef, useContext, Fragment } from 'react';
import { useComment, addComment } from '../../../context/comment/commentState';

import { usePosts } from '../../../context/post/PostState';
import AlertContext from '../../../context/alert/alertContext';

const CommentForm = () => {
  const postState = usePosts()[0];

  const { post } = postState;

  // const commentDispatch = useComment()[1];

  const [commentState, commentDispatch] = useComment();

  const { error } = commentState;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const newComment = useRef('');

  const postComment = async (e) => {
    e.preventDefault();

    let newCommentValue = newComment.current.value.trim();

    if (newCommentValue === '') {
      setAlert('Comment cannot be empty', 'danger');
    }

    let response = await addComment(commentDispatch, post.postId, {
      content: newCommentValue,
    });

    if (response !== undefined) {
      setAlert(response, 'success');
      document.querySelector('#newCommentArea').value = '';
    } else if (error) {
      setAlert(error, 'danger');
    }
  };

  return (
    <Fragment>
      <h3>Post Comment</h3>
      <div className='form-outline mb-3'>
        <textarea
          className='form-control'
          id='newCommentArea'
          rows='2'
          ref={newComment}
        ></textarea>
      </div>
      <button
        type='button'
        className='btn btn-primary btn-lg btn-rounded mb-3'
        onClick={postComment}
      >
        Post
      </button>
      <hr />
    </Fragment>
  );
};

export default CommentForm;
