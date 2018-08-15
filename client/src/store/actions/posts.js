import * as actionTypes from './actionTypes';

import axios from 'axios';

export const postLoading = () => ({
    type: actionTypes.POST_LOADING 
});

export const postErrors = (errors) => ({
    type: actionTypes.POST_ERRORS,
    errors
});

export const getPosts = (posts) => ({
    type: actionTypes.GET_POSTS,
    posts
});

export const fetchPosts = () => dispatch => {
    // inialize loading
    dispatch(postLoading());

    axios.get('/api/posts')
        .then(res => {
            const posts = res.data.posts;

            dispatch(getPosts(posts));
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch(postErrors(err.response.data));
        });
};

/*
    -----------------
    - Create new post
*/
export const addPostSuccess = (post) => ({
    type: actionTypes.ADD_POST,
    post
});

export const addPost = (post) => dispatch => {
    // inialize loading
    dispatch(postLoading());

    axios.post('/api/posts', post)
        .then(res => {
            console.log(res.data);
            dispatch(addPostSuccess(res.data));
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch(postErrors(err.response.data));
        });
};

/*
    -----------------
    - Delete post
*/
export const deletePostSuccess = (postId) => ({
    type: actionTypes.DELETE_POST,
    postId
});

export const deletePost = (postId) => dispatch => {
    axios.delete(`/api/posts/${postId}`)
        .then(res => {
            //update my posts array
            dispatch(deletePostSuccess(postId));
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch(postErrors(err.response.data));
        });
};

/*
    -----------------
    - Add and remove Like 
*/
export const like = (postId) => dispatch => {
    axios.post(`/api/posts/like/${postId}`)
        .then(() => dispatch(fetchPosts()))
        .catch(err => {
            console.log(err.response.data);
            dispatch(postErrors(err.response.data));
        });
};