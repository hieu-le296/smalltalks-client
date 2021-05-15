import React, { useState, useEffect, Fragment } from 'react';
import QuestionItem from '../questions/auth/QuestionItem';
import {
  useQuestions,
  getQuestions,
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
    async function getAllQuestion() {
      if (user && isAuthenticated && user.data.role === 'admin') {
        await getQuestions(questionDispatch);
        setSpinner(false);
      }
    }

    getAllQuestion();
    // eslint-disable-next-line
  }, [user, isAuthenticated, setSpinner]);

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
    return <h4 className='text-center mt-5'>Wanna ask a question?</h4>;
  }

  return (
    <Fragment>
      {filtered !== null ? showFilteredQuestions : showAllQuestions}
    </Fragment>
  );
};

export default Questions;
