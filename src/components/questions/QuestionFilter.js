import React, { useEffect, useRef } from 'react';
import {useQuestions, filterQuestions, clearFilter} from '../../context/question/QuestionState'


const QuestionFilter = () => {
 
  const [questionState, questionDispatch] = useQuestions();
  const {filtered} = questionState

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterQuestions(questionDispatch, e.target.value);
    } else {
      clearFilter(questionDispatch);
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
