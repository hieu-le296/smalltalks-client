import React, { useState, useEffect, Fragment } from 'react';
import PostItem from './PostItem';
import { usePosts, getUserPosts } from '../../../context/post/PostState';
import { useAuth } from '../../../context/auth/AuthState';
import Spinner from '../../layout/Spinner';

const Posts = () => {
  const [spinner, setSpinner] = useState(true);

  // We just need authState, so autState is at index 0
  const authState = useAuth()[0];
  const { isAuthenticated, user } = authState;

  const [postState, postDispatch] = usePosts();
  const { posts, filtered } = postState;

  // Run once when re-render
  useEffect(() => {
    async function getAllPosts() {
      if (user && isAuthenticated) {
        await getUserPosts(postDispatch, user.data.username);
        setSpinner(false);
      }
    }
    getAllPosts();

    // eslint-disable-next-line
  }, [user, isAuthenticated, setSpinner]);

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

  if (posts.length === 0 || posts === null) {
    return <h4 className='text-center mt-5'>Wanna ask a post?</h4>;
  }

  return (
    <Fragment>{filtered !== null ? showFilteredPosts : showAllPosts}</Fragment>
  );
};

export default Posts;
