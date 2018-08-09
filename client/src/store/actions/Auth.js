import * as actionTypes from './actionTypes';

import axios from 'axios';

import jwt_decode from 'jwt-decode';

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
                console.log(res);
                
                //Redirect user if he register to login
                if (isSignup) {
                    history.push('/login');
                    return; 
                }

                // get the token and user data when user login
                const token = res.data.token;
                console.log(token);

                //store token in localStorage
                localStorage.setItem('Token', token);

                const decodedToken = jwt_decode(token);
                console.log(decodedToken);

                dispatch(authSucess(decodedToken));
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data));
            });

    }
};

//check If there's a token exist