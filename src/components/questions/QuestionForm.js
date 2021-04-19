import React, { useState, useEffect, useContext } from 'react';
import QuestionContext from '../../context/question/questionContext';

const QuestionForm = () => {
  const questionContext = useContext(QuestionContext);

  const {
    addQuestion,
    updateQuestion,
    current,
    clearCurrent,
  } = questionContext;

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
  }, [questionContext, current]);

  const onChange = (e) =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addQuestion(question);
    } else {
      updateQuestion(question);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  const auto_height = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <form
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
          rows='1'
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
            <button className='btn btn-light btn-lg' onClick={clearAll}>
              <i className='fas fa-times'></i> Cancel
            </button>
          </div>
        ) : (
          <button type='submit' className='btn btn-secondary btn-lg'>
            <i className='fas fa-plus'></i> Post question
          </button>
        )}
      </div>
    </form>
  );
};

export default QuestionForm;
