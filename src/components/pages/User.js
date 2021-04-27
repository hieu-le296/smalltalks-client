import React, { Fragment } from 'react';
import PublicProfile from '../questions/public/PublicProfile';
import QuestionFilter from '../questions/QuestionFilter';
import UserQuestions from '../questions/public/UserQuestions';

const User = ({ match }) => {
  return (
    <Fragment>
      <PublicProfile username={match.params.username} />
      <hr />
      <QuestionFilter />
      <UserQuestions
        UserQuestionStyles={UserQuestionStyles}
        username={match.params.username}
      />
    </Fragment>
  );
};

const UserQuestionStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)',
  gridGap: '1rem',
};

export default User;
