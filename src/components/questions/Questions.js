import React, { useContext, Fragment } from 'react';
import QuestionItem from './QuestionItem';
import QuestionContext from '../../context/question/questionContext';

const Questions = () => {
  const questionContext = useContext(QuestionContext);

  const { questions } = questionContext;
  return (
    <Fragment>
      {questions.map((question) => (
        <QuestionItem key={question.questionId} question={question} />
      ))}
    </Fragment>
  );
};

export default Questions;
