import React, { useState, useEffect, useContext } from 'react';
import {
  useQuestions,
  addQuestion,
  updateQuestion,
  clearCurrent,
} from '../../../context/question/QuestionState';
import AlertContext from '../../../context/alert/alertContext';

const QuestionForm = () => {
  const [questionState, questionDispatch] = useQuestions();
  const { current, error } = questionState;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [question, setQuestion] = useState({
    title: '',
    content: '',
  });

  const { title, content } = question;

  useEffect(() => {
    if (current !== null) {
      setQuestion(current);
    } else {
      setQuestion({
        title: '',
        content: '',
      });
    }
  }, [current]);

  const onChange = (e) =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let msg;
    if (current === null) {
      msg = await addQuestion(questionDispatch, question);
      setAlert(msg, 'success');
    } else {
      msg = await updateQuestion(questionDispatch, question);
      setAlert(msg, 'success');
    }
    if (error) {
      setAlert(error, 'danger');
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(questionDispatch);
  };

  const auto_height = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <form
      id='question-form'
      className='form-outLine mt-5'
      style={{ marginRight: '5rem' }}
      onSubmit={onSubmit}
    >
      <h2 className='text-center'>
        {current ? 'Edit question' : 'Ask a question'}
      </h2>
      <div>
        <label className='form-label' htmlFor='title'>
          Title
        </label>
        <textarea
          className='form-control'
          id='title'
          name='title'
          onInput={auto_height}
          value={title}
          onChange={onChange}
        ></textarea>
      </div>

      <div className='mt-5'>
        <label className='form-label' htmlFor='content'>
          Content
        </label>
        <textarea
          className='form-control'
          id='content'
          name='content'
          row='1'
          onInput={auto_height}
          value={content}
          onChange={onChange}
        ></textarea>
      </div>
      <div className='mt-5 text-center'>
        {current ? (
          <div>
            <button type='submit' className='btn btn-success btn-lg mx-5'>
              <i className='fas fa-save'></i> Save
            </button>
            <button className='btn btn-light btn-lg mt-3' onClick={clearAll}>
              <i className='fas fa-times'></i> Cancel
            </button>
          </div>
        ) : (
          <button type='submit' className='btn btn-primary btn-lg'>
            <i className='fas fa-plus'></i> Post question
          </button>
        )}
      </div>
    </form>
  );
};

export default QuestionForm;
