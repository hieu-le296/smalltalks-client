import React, { useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  usePosts,
  deletePost,
  setCurrent,
  clearCurrent,
} from '../../../context/post/PostState';
import AlertContext from '../../../context/alert/alertContext';
import DOMPurify from 'dompurify';
import trimText from '../../../utils/trimText';

const API_URL = 'http://datacomputation.com/uploads/avatars';

const PostItem = ({ post }) => {
  // We just need postDispatch, so postDispatch is at index 1
  const postDispatch = usePosts()[1];

  const { postId, postedBy, title, slug, content, createdAt, updatedAt } = post;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [state, setState] = useState({
    showOriginalHTML: false,
  });

  const createMarkup = (html) => {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return {
      __html: `${
        !state.showOriginalHTML
          ? trimText(sanitizedHtml, 20, 50)[0]
          : sanitizedHtml
      }`,
    };
  };

  const handleShowText = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      showOriginalHTML: !prevState.showOriginalHTML,
    }));
  }, [setState]);

  const onDelete = async () => {
    if (window.confirm('Are you sure?')) {
      await deletePost(postDispatch, postId);
      setAlert('Post deleted!', 'warning');
      clearCurrent(postDispatch, postDispatch);
    }
  };

  return (
    <div className='card' onClick={(e) => e.stopPropagation()}>
      <div className='card-body'>
        <h5 className='card-title fw-bold'>{title}</h5>
        <p className='text-muted fs-6'>
          <strong>Created: </strong>
          {new Date(`${createdAt}`).toLocaleString()}
        </p>
        {postedBy && (
          <p className='text-muted'>
            Posted by:{' '}
            <img
              src={`${API_URL}/${postedBy.profilePic}`}
              alt='profile'
              className='rounded-circle'
              height='35'
              width='35'
              loading='lazy'
            />{' '}
            <Link to={`/users/${postedBy.username}`}>
              <strong> {postedBy.name}</strong>
            </Link>
          </p>
        )}
        <div className='mb-3'>
          <div
            dangerouslySetInnerHTML={createMarkup(content)}
            className='card-text article-content'
          ></div>
          <button className='read-more' onClick={handleShowText}>
            {!state.showOriginalHTML ? 'read more' : 'show less'}
          </button>
        </div>

        <div className='float-end'>
          <button
            type='button'
            className='btn btn-secondary btn-rounded me-3'
            onClick={() => setCurrent(postDispatch, post)}
          >
            <i className='fas fa-pencil-alt' />
          </button>
          <button
            type='button'
            className='btn btn-danger btn-rounded me-3'
            onClick={onDelete}
          >
            <i className='fas fa-trash' />
          </button>
          <Link
            to={`/posts/${slug}`}
            className='btn btn-info btn-rounded float-end'
          >
            <i className='fas fa-arrow-circle-right' />
          </Link>
        </div>
      </div>
      <div className='card-footer text-muted fs-6'>
        <p>
          <strong>Modified</strong>: {new Date(`${updatedAt}`).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
