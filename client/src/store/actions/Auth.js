import * as actionTypes from './actionTypes';
import axios from 'axios';

//start request
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

//get response [ Request Successeded ]
export const authSucess = (userData) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        userData
    };
};

//get response [ Request Failed ]
export const authFail = (errors) => {
    return {
        type: actionTypes.authFail,
        errors
    };
};

export const auth = (userData, isSignup) => {
    return dispatch => {
        // turn loding on
        dispatch(authStart());

        let url = 'login';

        if (isSignup) {
            url =  'register'
        }
        // send request
        axios.post(`/api/users/${url}`, userData)
            .then(res => {
                dispatch(authSucess(res.data))
            })
            .catch(err => {
                dispatch(authFail(err.response.data));
            });

    }
};

//check If there's a token exist