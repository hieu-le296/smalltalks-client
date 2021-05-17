import React, { useState, useEffect, Fragment } from 'react';
import PostItem from './PostItem';
import { usePosts, getPosts } from '../../../context/post/PostState';
import Spinner from '../../layout/Spinner';

const HomePosts = ({ postHomeStyles }) => {
  const [spinner, setSpinner] = useState(true);

  const [postState, postDispatch] = usePosts();
  const { posts, filtered } = postState;

  // Run once when re-render
  useEffect(() => {
    async function getAllPosts() {
      await getPosts(postDispatch);
      setSpinner(false);
    }

    getAllPosts();
    // eslint-disable-next-line
  }, [setSpinner, postDispatch]);

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
    return <h4 className='text-center mt-5'>Wanna ask a post?</h4>;

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
