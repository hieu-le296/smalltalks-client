import React, { useContext, useEffect, useRef } from 'react';
import QuestionContext from '../../context/question/questionContext';

const QuestionFilter = () => {
  const questionContext = useContext(QuestionContext);

  const { filtered, filterQuestions, clearFilter } = questionContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterQuestions(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className='form-outLine mt-5'>
      <input
        type='text'
        ref={text}
        placeholder='Search Questions...'
        className='form-control'
        onChange={onChange}
      />
    </form>
  );
};

export default QuestionFilter;
