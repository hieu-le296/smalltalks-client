import React, { Fragment } from 'react';
import QuestionFilter from '../questions/QuestionFilter';
import HomeQuestions from '../questions/HomeQuestions';

const Home = () => {
  return (
    <Fragment>
      <QuestionFilter />
      <HomeQuestions questionHomeStyles={questionHomeStyles} />
    </Fragment>
  );
};

const questionHomeStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Home;
