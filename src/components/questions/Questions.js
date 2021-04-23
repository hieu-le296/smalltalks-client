import React, { useContext, useState, useEffect, Fragment } from 'react';
import QuestionItem from './QuestionItem';
import QuestionContext from '../../context/question/questionContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const Questions = () => {
  const [spinner, setSpinner] = useState(true);

  const questionContext = useContext(QuestionContext);

  const {
    questions,
    getQuestions,
    getUserQuestions,
    filtered,
  } = questionContext;

  const authContext = useContext(AuthContext);

  const { isAuthenticated, user } = authContext;

  // Run once when re-render
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);

    if (user && isAuthenticated) {
      getUserQuestions(user.data.userId);
    } else {
      getQuestions();
    }
    // eslint-disable-next-line
  }, [user, isAuthenticated]);

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
