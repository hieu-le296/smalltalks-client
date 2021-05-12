import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useQuestions,
  getQuestion,
  clearQuestion,
} from '../../../context/question/QuestionState';
import Comments from '../../comments/auth/Comments';
import Spinner from '../../layout/Spinner';
import DOMPurify from 'dompurify';

import {
  useComment,
  clearCommentsWhenBack,
} from '../../../context/comment/commentState';

const API_URL = 'http://datacomputation.com/uploads/avatars';

const QuestionPage = ({ match }) => {
  const [questionState, questionDispatch] = useQuestions();

  const commentDisptach = useComment()[1];

  useEffect(() => {
    getQuestion(questionDispatch, match.params.slug);
  }, [questionDispatch, match.params.slug]);

  const { question } = questionState;

  const { questionId, title, content, postedBy, createdAt, updatedAt } =
    question;

  const clearComments = () => {
    clearCommentsWhenBack(commentDisptach);
    clearQuestion(questionDispatch);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <Fragment>
      <Link
        to='/'
        className='btn btn-light btn-rounded mt-5'
        onClick={clearComments}
      >
        <i className='fas fa-angle-double-left'></i> Back to Home
      </Link>
      {isEmpty(question) ? (
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
              <div
                className='card-text article-content'
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
          <Comments questionId={questionId} />
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

export default QuestionPage;
