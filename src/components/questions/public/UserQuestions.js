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
    async function showUserQuestions() {
      await getUserQuestions(questionDispatch, username);
      setSpinner(false);
    }
    showUserQuestions();
  }, [questionDispatch, username, setSpinner]);

  const showFilteredQuestions =
    filtered &&
    filtered.map((filter) => (
      <QuestionItem
        key={filter.questionId}
        id={filter.questionId}
        question={filter}
      />
    ));

  const showAllQuestions =
    questions &&
    questions.map((question) => (
      <QuestionItem
        key={question.questionId}
        id={question.questionId}
        question={question}
      />
    ));

  if (spinner) return <Spinner />;

  if (questions.length === 0 || questions === null) {
    return (
      <p className='lead text-center mt-5'>
        User <strong>{username}</strong> did not post any question yet.
      </p>
    );
  }

  return (
    <Fragment>
      <div style={UserQuestionStyles}>
        {filtered !== null ? showFilteredQuestions : showAllQuestions}
      </div>
    </Fragment>
  );
};

export default UserQuestions;
