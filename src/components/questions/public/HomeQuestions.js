import React, { useState, useEffect, Fragment } from 'react';
import HomeQuestionItem from './QuestionItem';
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
    setTimeout(() => {
      setSpinner(false);
    }, 3000);

    getQuestions(questionDispatch);
    // eslint-disable-next-line
  }, [setSpinner, questionDispatch]);

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
            <div style={questionHomeStyles}>
              {filtered !== null
                ? filtered.map((question) => (
                    <HomeQuestionItem
                      key={question.questionId}
                      id={question.questionId}
                      question={question}
                    />
                  ))
                : questions.map((question) => (
                    <HomeQuestionItem
                      key={question.questionId}
                      id={question.questionId}
                      question={question}
                    />
                  ))}
            </div>
          ) : (
            <Spinner />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeQuestions;
