import * as actionTypes from '../actions/actionTypes';
import isEmpty from '../../validation/isEmpty';

const intialState = {
    user: null,
    errors: {},
    isAuthenticated: false
};

const authReducer = (state = intialState , action) => {
    switch(action.type){
        case actionTypes.AUTH_SUCESS: 
            return {
                ...state,
                // userData
                isAuthenticated: !isEmpty(action.token),
                user: action.userData
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                errors: action.errors
            }
        default: 
            return state;
    }
};

export default authReducer;