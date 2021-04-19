import React, { useState, useContext } from 'react';
import QuestionContext from '../../context/question/questionContext';

const QuestionForm = () => {
  const questionContext = useContext(QuestionContext);

  const { addQuestion } = questionContext;

  const [question, setQuestion] = useState({
    title: '',
    content: '',
  });
  const { title, content } = question;

  const onChange = (e) =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addQuestion(question);
    // Reset the question state after adding the question
    setQuestion({
      title: '',
      content: '',
    });
  };

  return (
    <form
      className='form-outLine'
      style={{ margin: '15px 20px 0 0' }}
      onSubmit={onSubmit}
    >
      <h2 className='text-center text-secondary'>Ask a question</h2>
      <div>
        <label className='form-label' htmlFor='title'>
          Title
        </label>
        <textarea
          className='form-control'
          id='title'
          name='title'
          value={title}
          onChange={onChange}
        ></textarea>
      </div>

      <div className='mt-5'>
        <label className='form-label' htmlFor='content'>
          Content
        </label>
        <textarea
          className='form-control form-control-lg'
          id='content'
          name='content'
          value={content}
          onChange={onChange}
        ></textarea>
      </div>
      <div className='mt-5 text-center'>
        <button type='submit' className='btn btn-secondary btn-lg'>
          <i className='fas fa-plus'></i> Post question
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
