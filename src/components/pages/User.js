import React, { Fragment } from 'react';
import PublicProfile from '../users/public/PublicProfile';

const User = ({ match }) => {
  return (
    <Fragment>
      <PublicProfile username={match.params.username} />
    </Fragment>
  );
};

export default User;
