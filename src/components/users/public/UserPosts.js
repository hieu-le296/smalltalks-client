import React, { useState, useEffect, Fragment } from 'react';
import PostItem from '../../posts/public/PostItem';
import { usePosts, getUserPosts } from '../../../context/post/PostState';
import Spinner from '../../layout/Spinner';

const UserPosts = ({ UserPostStyles, username }) => {
  const [spinner, setSpinner] = useState(true);

  const [postState, postDispatch] = usePosts();
  const { posts, filtered } = postState;

  useEffect(() => {
    async function showUserPosts() {
      await getUserPosts(postDispatch, username);
      setSpinner(false);
    }
    showUserPosts();
  }, [postDispatch, username, setSpinner]);

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
    return (
      <p className='lead text-center mt-5'>
        User <strong>{username}</strong> did not post any post yet.
      </p>
    );
  }

  return (
    <Fragment>
      <div style={UserPostStyles}>
        {filtered !== null ? showFilteredPosts : showAllPosts}
      </div>
    </Fragment>
  );
};

export default UserPosts;
