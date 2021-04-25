import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  useQuestions,
  deleteQuestion,
  setCurrent,
  clearCurrent,
} from '../../../context/question/QuestionState';
import AlertContext from '../../../context/alert/alertContext';

const QuestionItem = ({ question }) => {
  // We just need questionDispatch, so questionDispatch is at index 1
  const questionDispatch = useQuestions()[1];

  const { questionId, title, content, createdAt, updatedAt } = question;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const onDelete = () => {
    if (window.confirm('Are you sure?')) {
      deleteQuestion(questionDispatch, questionId);
      setAlert('Question deleted!', 'warning');
      clearCurrent(questionDispatch, questionDispatch);
    }
  };

  const auto_height = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title fw-bold'>{title}</h5>
        <p className='text-muted fs-6'>
          <strong>Created: </strong>
          {new Date(`${createdAt}`).toLocaleString()}
        </p>
        <div className='card-text'>
          <textarea
            readOnly={true}
            value={content}
            onInput={auto_height}
          ></textarea>
          {/* <p className='article-content'>{content}</p> */}
        </div>
        <div className='float-end'>
          <button
            type='button'
            className='btn btn-secondary btn-sm me-3'
            onClick={() => setCurrent(questionDispatch, question)}
          >
            <i className='fas fa-pencil-alt'></i> Edit
          </button>
          <button
            type='button'
            className='btn btn-danger btn-sm me-3'
            onClick={onDelete}
          >
            <i className='fas fa-trash'></i> Delete
          </button>
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

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionItem;
