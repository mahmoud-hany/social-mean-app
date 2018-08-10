import * as actionTypes from './actionTypes';

import axios from 'axios';

import jwt_decode from 'jwt-decode';

import setAuthStart from './utils';

//start request
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

//get response [ Request Successeded ]
export const authSucess = (token, userData) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        token,
        userData
    };
};

//get response [ Request Failed ]
export const authFail = (errors) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errors
    };
};

// redirect user to login page In case of Registration success
export const redirectToLogin = () => {
    return {
        type: actionTypes.REDIRECT_TO_LOGIN
    }
}

// logout user
export const logout = () => {
    // remove token from localStorage
    localStorage.removeItem('Token');
    // remove token from request headers
    setAuthStart(false);

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (userData, isSignup, history) => {
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
                //Redirect user if he register to login
                if (isSignup) {
                    history.push('/login');
                    return; 
                }

                // get the token and user data when user login
                const token = res.data.token;
                // store token in localStorage
                localStorage.setItem('Token', token);
                // set token to Auth header
                setAuthStart(token);

                const decodedToken = jwt_decode(token);

                // store the token and userData in state
                dispatch(authSucess(token, decodedToken));
                
                //Redirect user to dashboard
                history.push('/dashboard');
            })
            .catch(err => {
                // store error in the error state 
                dispatch(authFail(err.response.data));
            });
    }
};

// Check for Authentication
export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('Token');
        if (token) {
            // set token to Auth header
            setAuthStart(token);

            const decodedToken = jwt_decode(token);
            // store the token and userData in state
            dispatch(authSucess(token, decodedToken));
        } else {
            dispatch(logout());
        }
    }
}

//check If there's a token exist