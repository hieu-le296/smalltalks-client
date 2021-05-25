import React, { Fragment } from 'react';
import PublicProfile from '../users/public/PublicProfile';
import UserPosts from '../users/public/UserPosts';
import PostFilter from '../posts/PostFilter';

const User = ({ match }) => {
  return (
    <Fragment>
      <PublicProfile username={match.params.username} />
      <hr />
      <PostFilter />
      <UserPosts
        UserPostStyles={UserPostStyles}
        username={match.params.username}
      />
    </Fragment>
  );
};

const UserPostStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)',
  gridGap: '1rem',
};

export default User;
