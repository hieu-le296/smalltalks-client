import React, { useState, useEffect, Fragment } from 'react';
import PostFilter from '../posts/PostFilter';
import HomePosts from '../posts/public/HomePosts';
import { usePosts, getPosts } from '../../context/post/PostState';
import axios from 'axios';
import Spinner from '../layout/Spinner';

const Home = () => {
  const [spinner, setSpinner] = useState(true);

  const [postState, postDispatch] = usePosts();
  const { posts, filtered } = postState;
  // Run once when re-render
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function getAllPosts() {
      await getPosts(postDispatch, source.token);
      setSpinner(false);
    }

    getAllPosts();

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line
  }, []);

  if (spinner) return <Spinner />;
  return (
    <Fragment>
      <PostFilter />
      {posts.length > 0 ? (
        <HomePosts
          posts={posts}
          filtered={filtered}
          spinner={spinner}
          postHomeStyles={postHomeStyles}
        />
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

const postHomeStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr)',
  gridGap: '2rem',
};

export default Home;
