import React, { Fragment } from 'react';
import PostFilter from '../posts/PostFilter';
import HomePosts from '../posts/public/HomePosts';

const Home = () => {
  return (
    <Fragment>
      <PostFilter />
      <HomePosts postHomeStyles={postHomeStyles} />
    </Fragment>
  );
};

const postHomeStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)',
  gridGap: '1rem',
};

export default Home;
