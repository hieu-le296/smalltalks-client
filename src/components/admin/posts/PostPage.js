import React, { useState, useEffect, Fragment } from 'react';
import { usePosts, getPosts } from '../../../context/post/PostState';
import { useAuth } from '../../../context/auth/AuthState';
import Posts from './Posts';
import Spinner from '../../layout/Spinner';

const PostPage = () => {
  const [spinner, setSpinner] = useState(true);

  // We just need authState, so autState is at index 0
  const authState = useAuth()[0];
  const { isAuthenticated, user } = authState;

  const [postState, postDispatch] = usePosts();
  const { posts, filtered } = postState;

  // Run once when re-render
  useEffect(() => {
    async function getAllPost() {
      if (user && isAuthenticated && user.data.role === 'admin') {
        await getPosts(postDispatch);
        setSpinner(false);
      }
    }

    getAllPost();
    // eslint-disable-next-line
  }, [user, isAuthenticated, setSpinner]);

  if (spinner) return <Spinner />;

  if (posts.length === 0 || posts === null) {
    return <h4 className='text-center mt-5'>Wanna ask a post?</h4>;
  }

  return (
    <Fragment>
      {posts.length > 0 ? (
        <Posts posts={posts} filtered={filtered} spinner={spinner} />
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default PostPage;
