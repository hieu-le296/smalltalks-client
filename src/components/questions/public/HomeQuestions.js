import React, { useState, useEffect, Fragment } from 'react';
import QuestionItem from './QuestionItem';
import {
  useQuestions,
  getQuestions,
} from '../../../context/question/QuestionState';
import Spinner from '../../layout/Spinner';

const HomeQuestions = ({ questionHomeStyles }) => {
  const [spinner, setSpinner] = useState(true);

  const [questionState, questionDispatch] = useQuestions();
  const { questions, filtered } = questionState;

  // Run once when re-render
  useEffect(() => {
    async function getAllQuestions() {
      await getQuestions(questionDispatch);
      setSpinner(false);
    }

    getAllQuestions();
    // eslint-disable-next-line
  }, [setSpinner, questionDispatch]);

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

  if (questions.length === 0 || questions === null)
    return <h4 className='text-center mt-5'>Wanna ask a question?</h4>;

  return (
    <Fragment>
      {questions && (
        <div style={questionHomeStyles}>
          {filtered !== null ? showFilteredQuestions : showAllQuestions}
        </div>
      )}
    </Fragment>
  );
};

export default HomeQuestions;
