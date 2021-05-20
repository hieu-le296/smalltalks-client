import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { usePosts, getPost } from '../../../context/post/PostState';
import Comments from '../../comments/auth/Comments';
import Spinner from '../../layout/Spinner';
import DOMPurify from 'dompurify';

const PostPage = ({ match }) => {
  const [postState, postDispatch] = usePosts();

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function showPost() {
      await getPost(postDispatch, match.params.slug, source.token);
    }
    showPost();

    return () => {
      source.cancel();
    };
  }, [postDispatch, match.params.slug]);

  const { post } = postState;

  const { postId, title, content, postedBy, createdAt, updatedAt } = post;

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <Fragment>
      <Link to='/' className='btn btn-light btn-rounded mt-5'>
        <i className='fas fa-angle-double-left'></i> Back to Home
      </Link>
      {isEmpty(post) ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='card'>
            <div className='card-body'>
              <h1 className='card-title fw-bold'>{title}</h1>
              <p className='text-muted fs-6'>
                <i className='fas fa-clock'></i>{' '}
                {new Date(`${createdAt}`).toLocaleString()}
              </p>
              <p className='text-muted'>
                Posted by:{' '}
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${postedBy.profilePic}`}
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
              <div
                className='card-text dynamic-content-div'
                dangerouslySetInnerHTML={createMarkup(content)}
              ></div>
            </div>
            <div className='card-footer text-muted fs-6'>
              <p>
                <i className='fas fa-edit'></i>{' '}
                {new Date(`${updatedAt}`).toLocaleString()}
              </p>
            </div>
          </div>
          <hr />
          <Comments postId={postId} />
        </Fragment>
      )}
    </Fragment>
  );
};

const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export default PostPage;
