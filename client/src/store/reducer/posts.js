import * as actionTypes from '../actions/actionTypes';

const initialState = {
    post: null,
    posts: [],
    errors: null,
    loading: false
};

const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_POSTS: 
            return {
                ...state,
                posts: action.posts,
                errors: null,
                loading: false
            };
        // case actionTypes.GET_POST: 
        //     return {
        //         ...state,
        //         posts: action.posts,
        //         errors: null,
        //         loading: false
        //     }
        case actionTypes.ADD_POST: 
            return {
                ...state,
                post: action.post, // add the post
                posts: [action.post, ...state.posts], // add the new post to posts array
                loading: false,
                errors: null
            };
        case actionTypes.DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.postId) // remove post from post array by its id
            };
        case actionTypes.POST_ERRORS: 
            return {
                ...state,
                errors: action.errors,
                loading: false
            };
        default: 
            return state;
    }
};

export default PostReducer;