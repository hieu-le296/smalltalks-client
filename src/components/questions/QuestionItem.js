import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import QuestionContext from '../../context/question/questionContext';

const QuestionItem = ({ question }) => {
  const questionContext = useContext(QuestionContext);

  const { deleteQuestion, setCurrent, clearCurrent } = questionContext;

  const { questionId, title, content, createdAt, updatedAt } = question;

  const onDelete = () => {
    deleteQuestion(questionId);
    clearCurrent();
  };

  return (
    <div className='card' style={cardStyle}>
      <div className='card-body'>
        <h5 className='card-title fw-bold' style={{ color: '#4c51a4' }}>
          {title}
        </h5>
        <p className='text-muted fs-6'>
          <strong>Created: </strong>
          {new Date(`${createdAt}`).toLocaleString()}
        </p>
        <p className='card-text'>{content}</p>
        <button
          type='button'
          className='btn btn-primary btn-sm me-3'
          onClick={() => setCurrent(question)}
        >
          Edit <i className='fas fa-pencil-alt'></i>
        </button>
        <button
          type='button'
          className='btn btn-danger btn-sm me-3'
          onClick={onDelete}
        >
          Delete <i className='fas fa-trash'></i>
        </button>
      </div>
      <div className='card-footer text-muted fs-6'>
        <p>
          <strong>Modified</strong>: {new Date(`${updatedAt}`).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
};

const cardStyle = {
  background: '#ddc9e6',
  margin: '15px 0 15px 0px',
};

export default QuestionItem;
