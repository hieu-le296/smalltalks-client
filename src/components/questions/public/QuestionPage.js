import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const QuestionPage = ({ match }) => {
  return (
    <Fragment>
      <Link to='/' className='btn btn-light mt-5'>
        <i className='fas fa-angle-double-left'></i> Back to Home
      </Link>
    </Fragment>
  );
};

export default QuestionPage;
