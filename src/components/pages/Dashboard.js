import React from 'react';
import Questions from '../questions/auth/Questions';
import QuestionForm from '../questions/auth/QuestionForm';
import QuestionFilter from '../questions/QuestionFilter';

const Dashboard = () => {
  return (
    <div className='row'>
      <div className='mb-5'>
        <QuestionForm />
      </div>
      <hr />
      <div>
        <h3 className='text-center mt-5'>Your Posted Questions</h3>
        <QuestionFilter />
        <Questions />
      </div>
    </div>
  );
};

export default Dashboard;
