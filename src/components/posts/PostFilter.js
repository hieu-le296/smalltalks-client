import React, { useEffect, useRef } from 'react';
import {
  usePosts,
  filterPosts,
  clearFilter,
} from '../../context/post/PostState';

const PostFilter = () => {
  const [postState, postDispatch] = usePosts();
  const { filtered } = postState;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPosts(postDispatch, e.target.value);
    } else {
      clearFilter(postDispatch);
    }
  };

  return (
    <div className='form-outLine mt-5'>
      <input
        type='text'
        ref={text}
        placeholder='Search Posts...'
        className='form-control'
        onChange={onChange}
      />
    </div>
  );
};

export default PostFilter;
