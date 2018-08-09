import * as actionTypes from '../actions/actionTypes';

const intialState = {
    errors: {}
};

const authReducer = (state = intialState , action) => {
    switch(action.type){
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