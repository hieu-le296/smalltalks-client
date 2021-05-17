import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostItem = ({ post }) => {
  const { slug, title, postedBy, createdAt } = post;

  return (
    <div className='card'>
      <div className='card-body'>
        <h5>
          <Link to={`/posts/${slug}`} className='card-title fw-bold'>
            {title}
          </Link>
        </h5>

        <p className='text-muted'>
          <i className='fas fa-user' />{' '}
          {postedBy && (
            <Link to={`/users/${postedBy.username}`}>
              <strong> {postedBy.name}</strong>
            </Link>
          )}
        </p>

        <p className='text-muted fs-6'>
          <i className='fas fa-clock'></i>{' '}
          {new Date(`${createdAt}`).toLocaleString()}
        </p>
      </div>
      <div className='text-center mb-3'>
        <Link to={`/posts/${slug}`} className='btn btn-info btn-floating'>
          <i className='fas fa-arrow-circle-right' />
        </Link>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
