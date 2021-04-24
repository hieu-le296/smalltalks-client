import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useQuestions,
  getQuestion,
} from '../../../context/question/QuestionState';
import Spinner from '../../layout/Spinner';

const QuestionPage = ({ match }) => {
  const [questionState, questionDispatch] = useQuestions();

  useEffect(() => {
    getQuestion(questionDispatch, match.params.questionId);
  }, []);

  const { question } = questionState;

  const { title, content, postedBy, createdAt, updatedAt } = question;

  console.log(question);

  return (
    <Fragment>
      <Link to='/' className='btn btn-light mt-5'>
        <i className='fas fa-angle-double-left'></i> Back to Home
      </Link>
      {isEmpty(question) ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='card'></div>
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
