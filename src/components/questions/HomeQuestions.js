import React, { useContext, useState, useEffect, Fragment } from 'react';
import HomeQuestionItem from './HomeQuestionItem';
import QuestionContext from '../../context/question/questionContext';
import Spinner from '../layout/Spinner';

const HomeQuestions = ({ questionHomeStyles }) => {
  const [spinner, setSpinner] = useState(true);

  const questionContext = useContext(QuestionContext);

  const { questions, getQuestions, filtered } = questionContext;

  // Run once when re-render
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
    
    getQuestions();
    // eslint-disable-next-line
  }, [setSpinner]);

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
