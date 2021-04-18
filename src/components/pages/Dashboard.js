import React from 'react';
import Questions from '../questions/Questions';

const Dashboard = () => {
  return (
    <div className='row'>
      <div className='col-6'>{/* Question Form */}</div>
      <div className='col-6'>
        <Questions />
      </div>
    </div>
  );
};

export default Dashboard;
