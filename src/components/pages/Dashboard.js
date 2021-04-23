import React, { useContext } from 'react';
import Questions from '../questions/Questions';
import QuestionForm from '../questions/QuestionForm';
import QuestionFilter from '../questions/QuestionFilter';

import AuthContext from '../../context/auth/authContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className='row'>
      <div className='col-6'>
        <QuestionForm />
      </div>
      <div className='col-6'>
        <h3 className='text-center mt-5'>Your Posted Questions</h3>
        <QuestionFilter />
        <Questions />
      </div>
    </div>
  );
};

export default Dashboard;
