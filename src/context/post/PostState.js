import React, { useReducer, useContext, useMemo } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  GET_POSTS,
  GET_POST,
  GET_USER_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  POST_ERROR,
  CLEAR_POST_ERROR,
  CLEAR_POSTS,
  CLEAR_POST,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  FILTER_POSTS,
  CLEAR_FILTER,
} from '../types';

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1`;

// Create a custom hook to use the contact context

export const usePosts = () => {
  const { state, dispatch } = useContext(PostContext);
  return [state, dispatch];
};

// Action creator

// Get All Posts
export const getPosts = async (dispatch, cancelToken) => {
  try {
    const res = await axios.get(`${API_URL}/posts`, {
      cancelToken: cancelToken,
    });
    dispatch({ type: GET_POSTS, payload: res.data.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Get Request Canceled');
    } else {
      dispatch({ type: POST_ERROR, payload: err.response.msg });
    }
  }
};

// Get single post
export const getPost = async (dispatch, slug, cancelToken) => {
  try {
    const res = await axios.get(`${API_URL}/posts/${slug}`, {
      cancelToken: cancelToken,
    });
    dispatch({ type: GET_POST, payload: res.data.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Get Request Canceled');
    } else {
      // dispatch({ type: POST_ERROR, payload: err.response.msg });
      console.log(err);
    }
  }
};

// Get User Post
export const getUserPosts = async (dispatch, username, cancelToken) => {
  try {
    const res = await axios.get(`${API_URL}/users/${username}/posts`, {
      cancelToken: cancelToken,
    });

    dispatch({ type: GET_USER_POSTS, payload: res.data.posts });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Get Request Canceled');
    } else {
      dispatch({ type: POST_ERROR, payload: err.response.msg });
    }
  }
};

//   Add Post
export const addPost = async (dispatch, post) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${API_URL}/posts`, post, config);
    dispatch({ type: ADD_POST, payload: res.data.data });
    return res.data.msg;
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err.response.data.error });
  }
};

// Update Post
export const updatePost = async (dispatch, post) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `${API_URL}/posts/${post.postId}`,
      post,
      config
    );
    dispatch({ type: UPDATE_POST, payload: res.data.data });
    return res.data.msg;
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err.response.msg });
  }
};

//   Delete Post
export const deletePost = async (dispatch, postId) => {
  try {
    await axios.delete(`${API_URL}/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err.response.msg });
  }
};

// Set Current Post
export const setCurrent = (dispatch, post) => {
  dispatch({ type: SET_CURRENT_POST, payload: post });
};

// Clear Current Post
export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_POST });
};

// Filter Post
export const filterPosts = (dispatch, text) => {
  dispatch({ type: FILTER_POSTS, payload: text });
};

// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

// Clear posts
export const clearPosts = (dispatch) => {
  dispatch({ type: CLEAR_POSTS });
};

// Clear single post
export const clearPost = (dispatch) => {
  dispatch({ type: CLEAR_POST });
};

// Clear post error
export const clearPostError = (dispatch) => {
  dispatch({ type: CLEAR_POST_ERROR });
};

const PostState = (props) => {
  const initState = {
    posts: [],
    post: {},
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(postReducer, initState);

  // useMemo to memoize the value given to the provider
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <PostContext.Provider value={contextValue}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
