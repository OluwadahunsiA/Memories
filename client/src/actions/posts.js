import * as api from '../api';
import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT
} from '../constants/actionTypes';

// Actions

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (search) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data }
    } = await api.fetchPostsBySearch(search);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//Post actions

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data.data.newPosts });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (err) {
    console.log(err);
  }
};
