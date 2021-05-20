import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import { usePosts, getPosts } from '../../../context/post/PostState';
import Spinner from '../../layout/Spinner';

const HomePosts = ({ postHomeStyles }) => {
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
  }, [setSpinner]);

  const showFilteredPosts =
    filtered &&
    filtered.map((filter) => (
      <PostItem key={filter.postId} id={filter.postId} post={filter} />
    ));

  const showAllPosts =
    posts &&
    posts.map((post) => (
      <PostItem key={post.postId} id={post.postId} post={post} />
    ));

  if (spinner) return <Spinner />;

  if (posts.length === 0 || posts === null)
    return <h4 className='text-center mt-5'>Wanna share something?</h4>;

  return (
    <Fragment>
      {posts && (
        <div style={postHomeStyles}>
          {filtered !== null ? showFilteredPosts : showAllPosts}
        </div>
      )}
    </Fragment>
  );
};

export default HomePosts;
