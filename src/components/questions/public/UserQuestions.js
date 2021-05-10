import React, { useState, useEffect, Fragment } from 'react';
import QuestionItem from './QuestionItem';
import {
  useQuestions,
  getUserQuestions,
} from '../../../context/question/QuestionState';
import Spinner from '../../layout/Spinner';

const UserQuestions = ({ UserQuestionStyles, username }) => {
  const [spinner, setSpinner] = useState(true);

  const [questionState, questionDispatch] = useQuestions();
  const { questions, filtered } = questionState;

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 2000);
    async function fetchData() {
      await getUserQuestions(questionDispatch, username);
    }
    fetchData();
  }, [questionDispatch, username, setSpinner]);

  if (questions.length === 0 || questions === null) {
    return (
      <p className='lead text-center mt-5'>
        User <strong>{username}</strong> did not post any question yet.
      </p>
    );
  }

  return (
    <Fragment>
      {spinner ? (
        <Spinner />
      ) : (
        <Fragment>
          <div style={UserQuestionStyles}>
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserQuestions;
