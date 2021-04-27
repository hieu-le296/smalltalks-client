import React, { useEffect, Fragment } from 'react';
import QuestionItem from './QuestionItem';
import {
  useQuestions,
  getUserQuestions,
} from '../../../context/question/QuestionState';
import Spinner from '../../layout/Spinner';

const UserQuestions = ({ UserQuestionStyles, username }) => {
  const [questionState, questionDispatch] = useQuestions();
  const { questions, filtered } = questionState;

  useEffect(() => {
    getUserQuestions(questionDispatch, username);
  }, [questionDispatch]);

  return (
    <Fragment>
      {questions.length === 0 ? (
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
