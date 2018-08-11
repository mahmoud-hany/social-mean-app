import * as actionTypes from '../actions/actionTypes';

const intialState = {
    errors: null
};

const createProfileReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PROFILE_FAIL:
            return {
                ...state,
                errors: action.errors,
            };
        default:
            return state;
    }
};

export default createProfileReducer;