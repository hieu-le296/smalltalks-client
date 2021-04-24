import React, { Fragment } from 'react';
import QuestionFilter from '../questions/QuestionFilter';
import HomeQuestions from '../questions/public/HomeQuestions';

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
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)',
  gridGap: '1rem',
};

export default Home;
