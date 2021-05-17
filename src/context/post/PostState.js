import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  GET_QUESTIONS,
  GET_QUESTION,
  GET_USER_QUESTIONS,
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  QUESTION_ERROR,
  CLEAR_QUESTION_ERROR,
  CLEAR_QUESTIONS,
  CLEAR_QUESTION,
  SET_CURRENT_QUESTION,
  CLEAR_CURRENT_QUESTION,
  FILTER_QUESTIONS,
  CLEAR_FILTER,
} from '../types';

const API_URL = 'https://datacomputation.com/api/v1';

// Create a custom hook to use the contact context

export const usePosts = () => {
  const { state, dispatch } = useContext(PostContext);
  return [state, dispatch];
};

// Action creator

// Get All Posts
export const getPosts = async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/posts`);
    dispatch({ type: GET_QUESTIONS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

// Get single post
export const getPost = async (dispatch, slug) => {
  try {
    const res = await axios.get(`${API_URL}/posts/${slug}`);
    dispatch({ type: GET_QUESTION, payload: res.data.data });
  } catch (err) {
    //dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

// Get User Post
export const getUserPosts = async (dispatch, username) => {
  try {
    const res = await axios.get(`${API_URL}/users/${username}/posts`);

    dispatch({ type: GET_USER_QUESTIONS, payload: res.data.posts });
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
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
    dispatch({ type: ADD_QUESTION, payload: res.data.data });
    return res.data.msg;
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.data.error });
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
    dispatch({ type: UPDATE_QUESTION, payload: res.data.data });
    return res.data.msg;
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

//   Delete Post
export const deletePost = async (dispatch, postId) => {
  try {
    await axios.delete(`${API_URL}/posts/${postId}`);
    dispatch({ type: DELETE_QUESTION, payload: postId });
  } catch (err) {
    dispatch({ type: QUESTION_ERROR, payload: err.response.msg });
  }
};

// Set Current Post
export const setCurrent = (dispatch, post) => {
  dispatch({ type: SET_CURRENT_QUESTION, payload: post });
};

// Clear Current Post
export const clearCurrent = (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_QUESTION });
};

// Filter Post
export const filterPosts = (dispatch, text) => {
  dispatch({ type: FILTER_QUESTIONS, payload: text });
};

// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

// Clear posts
export const clearPosts = (dispatch) => {
  dispatch({ type: CLEAR_QUESTIONS });
};

// Clear single post
export const clearPost = (dispatch) => {
  dispatch({ type: CLEAR_QUESTION });
};

// Clear post error
export const clearPostError = (dispatch) => {
  dispatch({ type: CLEAR_QUESTION_ERROR });
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

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
