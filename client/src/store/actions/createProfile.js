import * as actionTypes from './actionTypes';

import axios from 'axios';

export const createProfileStart = () => {
    return {
        type: actionTypes.CREATE_PROFILE_START
    };
};

export const createProfileFail = (errors) => {
    return {
        type: actionTypes.CREATE_PROFILE_FAIL,
        errors
    };
};


export const createProfile = (profileData, history) => {
    return dispatch => {
        //intializr loading
        dispatch(createProfileStart());

        //send data to server
        axios.post('/api/profile', profileData)
            .then(res => {
                console.log(res.data);
                //redirect to dashboard
                history.push('/dashboard');
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(createProfileFail(err.response.data));
            });
    }
}
