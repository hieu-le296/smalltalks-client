import React, { useState, useEffect, Fragment } from 'react';
import QuestionItem from '../questions/auth/QuestionItem';
import {
  useQuestions,
  getQuestions
} from '../../context/question/QuestionState';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';

const Questions = () => {
  const [spinner, setSpinner] = useState(true);

  // We just need authState, so autState is at index 0
  const authState = useAuth()[0];
  const { isAuthenticated, user } = authState;

  const [questionState, questionDispatch] = useQuestions();
  const { questions, filtered } = questionState;

  // Run once when re-render
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);

    if (user && isAuthenticated && user.data.role === 'admin') {
      getQuestions(questionDispatch);
    }
    // eslint-disable-next-line
  }, [user, isAuthenticated, setSpinner]);

  if (questions.length === 0 || questions === null) {
    return <h4 className='text-center mt-5'>Wanna ask a question?</h4>;
  }

  return (
    <Fragment>
      {spinner ? (
        <Spinner />
      ) : (
        <Fragment>
          {questions !== null ? (
            <Fragment>
              {filtered !== null
                ? filtered.map((question) => (
                    <QuestionItem
                      key={question.questionId}
                      id={question.questionId}
                      question={question}
                    />
                  ))
                : questions.map((question) => (
                    <QuestionItem
                      key={question.questionId}
                      id={question.questionId}
                      question={question}
                    />
                  ))}
            </Fragment>
          ) : (
            <Spinner />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Questions;
