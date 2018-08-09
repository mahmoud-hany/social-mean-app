import * as actionTypes from '../actions/actionTypes';

const intialState = {
    errors: {},
    redirectToLogin: false
};

const authReducer = (state = intialState , action) => {
    switch(action.type){
        case actionTypes.AUTH_SUCESS: 
            return {
                ...this.state,
                //get token and user id
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...this.state,
                errors: action.errors
            }
        default: 
            return state;
    }
};

export default authReducer;