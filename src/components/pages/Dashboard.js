import React from 'react';
import Questions from '../questions/Questions';
import QuestionForm from '../questions/QuestionForm';

const Dashboard = () => {
  return (
    <div className='row'>
      <div className='col-6'>
        <QuestionForm />
      </div>
      <div className='col-6'>
        <h3 className='text-center mt-5'>Your Posted Questions</h3>
        <Questions />
      </div>
    </div>
  );
};

export default Dashboard;
