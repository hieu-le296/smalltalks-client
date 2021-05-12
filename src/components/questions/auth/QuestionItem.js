import React, { useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  useQuestions,
  deleteQuestion,
  setCurrent,
  clearCurrent,
} from '../../../context/question/QuestionState';
import AlertContext from '../../../context/alert/alertContext';
import DOMPurify from 'dompurify';
import trimText from '../../../utils/trimText';

const QuestionItem = ({ question }) => {
  // We just need questionDispatch, so questionDispatch is at index 1
  const questionDispatch = useQuestions()[1];

  const { questionId, title, slug, content, createdAt, updatedAt } = question;

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
      await deleteQuestion(questionDispatch, questionId);
      setAlert('Question deleted!', 'warning');
      clearCurrent(questionDispatch, questionDispatch);
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
            onClick={() => setCurrent(questionDispatch, question)}
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
            to={`/questions/${slug}`}
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

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
};

export default QuestionItem;
