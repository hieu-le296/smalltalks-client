import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useQuestions,
  getQuestion,
} from '../../../context/question/QuestionState';
import Spinner from '../../layout/Spinner';

const API_URL = 'http://datacomputation.com/uploads/avatars';

const QuestionPage = ({ match }) => {
  const [questionState, questionDispatch] = useQuestions();

  useEffect(() => {
    getQuestion(questionDispatch, match.params.slug);
  }, [questionDispatch, match.params.slug]);

  const { question } = questionState;

  const { title, content, postedBy, createdAt, updatedAt } = question;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light mt-5'>
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
                  height='25'
                  loading='lazy'
                />{' '}
                <Link to={`/users/${postedBy.username}`}>
                  <strong> {postedBy.username}</strong>
                </Link>
              </p>

              <div className='card-text'>
                <p className='article-content'>{content}</p>
              </div>
            </div>
            <div className='card-footer text-muted fs-6'>
              <p>
                <i className='fas fa-edit'></i>{' '}
                {new Date(`${updatedAt}`).toLocaleString()}
              </p>
            </div>
          </div>
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
