import React, { useContext, Fragment } from 'react';
import QuestionItem from './QuestionItem';
import QuestionContext from '../../context/question/questionContext';

const Questions = () => {
  const questionContext = useContext(QuestionContext);

  const { questions, filtered } = questionContext;

  if (questions.length === 0) {
    return <h4 className='text-center mt-5'>Wanna ask a question?</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((question) => (
            <QuestionItem key={question.questionId} question={question} />
          ))
        : questions.map((question) => (
            <QuestionItem key={question.questionId} question={question} />
          ))}
    </Fragment>
  );
};

export default Questions;
