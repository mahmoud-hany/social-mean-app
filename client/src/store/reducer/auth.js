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
                isAuthenticated: !isEmpty(action.token),
                user: action.userData,
                errors: null        
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                errors: action.errors
            }
        case actionTypes.AUTH_LOGOUT: 
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default: 
            return state;
    }
};

export default authReducer;