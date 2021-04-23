import React, { useContext, useState, useEffect, Fragment } from 'react';
import QuestionItem from './QuestionItem';
import QuestionContext from '../../context/question/questionContext';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';

const Questions = () => {
  const [spinner, setSpinner] = useState(true);

  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  const questionContext = useContext(QuestionContext);

  const { questions, getUserQuestions, filtered } = questionContext;


  // Run once when re-render
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);

    if (user && isAuthenticated) {
      getUserQuestions(user.data.userId);
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
