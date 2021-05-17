import React from 'react';
import Posts from '../posts/auth/Posts';
import PostForm from '../posts/auth/PostForm';
import PostFilter from '../posts/PostFilter';

const Dashboard = () => {
  return (
    <div className='row'>
      <div className='mb-5'>
        <PostForm />
      </div>
      <hr />
      <div>
        <h3 className='text-center mt-5'>Your Posts</h3>
        <PostFilter />
        <Posts />
      </div>
    </div>
  );
};

export default Dashboard;
