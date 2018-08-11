import * as actionTypes from './actionTypes';

import axios from 'axios';

import { authSucess } from './auth';

/*
    -----------------------
    --  Fetch all profiles
*/
// initialize loading
export const loading = () => {
    return {
        type: actionTypes.LOADING
    };
};
// update profiles state
export const getProfilesSuccess = (profiles) => {
    return {
        type: actionTypes.GET_PROFILES_SUCCESS,
        profiles
    };
};
// update erors state
export const getProfilesFail = (errors) => {
    return {
        type: actionTypes.GET_PROFILES_FAIL,
        errors
    };
};

export const fetchProfiles = () => {
    return dispatch => {
        //intialize loading
        dispatch(loading());

        //start fetching profiles
        axios.get('/api/profile/all')
            .then(res => {
                console.log(res.data);

                const profiles = res.data.profiles;

                // update the state with our profiles
                dispatch(getProfilesSuccess(profiles));
            }).catch(err => {
                console.log(err.response.data);

                dispatch(getProfilesFail(err.response.data));
            });

    };
};
/*
    -----------------------
    --  GET user profile
*/

// update profiles state
export const getProfileSuccess = (profile) => {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        profile
    };
};

// update erors state
export const getProfileFail = (errors) => {
    return {
        type: actionTypes.GET_PROFILE_FAIL,
        errors
    };
};

export const fetchProfile = () => {
    return dispatch => {
        //intialize loading
        dispatch(loading());

        //start fetching profiles
        axios.get('/api/profile')
            .then(res => {
                console.log(res.data);

                const profile = res.data;

                // update the state with our profiles
                dispatch(getProfileSuccess(profile));
            }).catch(err => {
                console.log(err.response.data);

                dispatch(getProfileFail(err.response.data));
            });

    };
};

// Clear porfile state when User Logout
export const clearProfileStateOnLogout = () => {
    return {
        type: actionTypes.CLEAR_PROFILE_STATE_ON_LOGOUT
    };
};

/*
    -----------------------
    --  Delete Acount and profile
*/
export const deleteAcount = () => {
    return dispatch => {
        dispatch(loading());

        axios.delete('/api/profile')
            .then(res => {
                console.log(res.data);
                
                //log user out
                //this funtion will update authentication state
                dispatch(authSucess(null, null));
                //Clear localstoeage
                localStorage.removeItem('Token');
            })
            .catch(err => {
                //Displat error and try agin
            })
    };
};
