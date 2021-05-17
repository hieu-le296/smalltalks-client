import React, { Fragment } from 'react';
import PublicProfile from '../posts/public/PublicProfile';
import PostFilter from '../posts/PostFilter';
import UserPosts from '../posts/public/UserPosts';

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
