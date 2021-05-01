import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuestionItem = ({ question }) => {
  const { slug, title, content, createdAt, updatedAt } = question;

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title fw-bold'>{title}</h5>
        <p className='text-muted fs-6'>
          <strong>Created: </strong>
          {new Date(`${createdAt}`).toLocaleString()}
        </p>

        <p className='card-text text-truncate'>{content}</p>
      </div>
      <div className='card-footer text-muted fs-6'>
        <p>
          <strong>Modified</strong>: {new Date(`${updatedAt}`).toLocaleString()}
        </p>
      </div>
      <Link to={`/questions/${slug}`} className='btn btn-info'>
        Read More <i className='fas fa-arrow-circle-right'></i>
      </Link>
    </div>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionItem;
