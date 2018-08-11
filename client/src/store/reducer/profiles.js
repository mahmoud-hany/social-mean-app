import * as actionTypes from '../actions/actionTypes';

const intialState = {
    profiles: null,
    profile: null,
    errors: null,
    loading: false 
};

const profilesReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.profile
            };
        case actionTypes.GET_PROFILE_FAIL: 
            return {
                ...state,
                loading: false,
                errors: action.errors,
                profile: {}
            };
        case actionTypes.CREATE_PROFILE_FAIL:
            return {
                ...state,
                errors: action.errors
            };
        case actionTypes.CLEAR_PROFILE_STATE_ON_LOGOUT:
            return {
                ...state,
                errors: null,
                profile: null,
            }
        default:
            return state;
    }
};

export default profilesReducer;