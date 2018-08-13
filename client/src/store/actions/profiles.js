import * as actionTypes from './actionTypes';

import axios from 'axios';

import { authSucess } from './auth';

// initialize loading
export const loading = () => {
    return {
        type: actionTypes.LOADING
    };
};
// get errors
export const getErrors = (errors) => {
    return {
        type: actionTypes.GET_ERRORS,
        errors
    };
};

/*
    ----------------------
    --  Create profile
*/ 
export const createProfile = (profileData, history) => {
    return dispatch => {
        //intializr loading
        dispatch(loading());

        //send data to server
        axios.post('/api/profile', profileData)
            .then(res => {
                console.log(res.data);
                //redirect to dashboard
                history.push('/dashboard');
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(getErrors(err.response.data));
            });
    }
}
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
    --  Get profile by handle
*/
export const getProfileByHandle = (handle) => dispatch => {
    //intialize loading
    dispatch(loading());

    axios.get(`/api/profile/handle/${handle}`)
        .then(res => {
            console.log(res.data);

            const profile = res.data;

            // update the state with our profiles
            dispatch(getProfileSuccess(profile));
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch(getProfileFail(err.response.data));
        });
}


/*
    -----------------------
    --  Add Experiecnce
*/
export const addExperienceSuccess = () => {
    return {
        type: actionTypes.ADD_EXPERIENCE_SUCCESS
    };
};

export const addExperience = (experiecnceData, history) => {
    return dispatch => {
        dispatch(loading());

        axios.post('api/profile/experience', experiecnceData)
            .then(res => {
                console.log(res.data);
                // stop loading
                dispatch(addExperienceSuccess());
                // redirect user
                history.push('/dashboard')
            })
            .catch(err => {
                // update errors object
                dispatch(getErrors(err.response.data));
            });
    }
}

/*
    -----------------------
    --  Delete Experience
*/
export const deleteExperience = (id) => {
    return dispatch => {
        axios.delete(`api/profile/experience/${id}`)
            .then(res => {
                console.log(res.data)
                // get the updated profile again
                dispatch(getProfileSuccess(res.data));
            })
            .catch(err => {
                // update errors object
                dispatch(getErrors(err.response.data));
            });
    };
};

/*
    -----------------------
    --  Add Education
*/
export const addEducationSuccess = () => {
    return {
        type: actionTypes.ADD_EDUCATION_SUCCESS
    };
};

export const addEducation = (educationData, history) => {
    return dispatch => {
        dispatch(loading());

        axios.post('/api/profile/education', educationData)
            .then(res => {
                console.log(res.data);
                // stop loading
                dispatch(addEducationSuccess());

                //redirect user to dashboard
                history.push('/dashboard');
            })
            .catch(err => {
                // update errors object
                dispatch(getErrors(err.response.data));
            });
    }
}

/*
    -----------------------
    --  Delete Education
*/
export const deleteEducation = (id) => {
    return dispatch => {
        axios.delete(`api/profile/education/${id}`)
            .then(res => {
                console.log(res.data)
                // get the updated profile again
                dispatch(getProfileSuccess(res.data));
            })
            .catch(err => {
                // update errors object
                dispatch(getErrors(err.response.data));
            });
    };
};

/*
    -----------------------
    --  Fetch all profiles
*/
export const getProfilesStart = () => {
    return {
        type: actionTypes.GET_PROFILES_START
    }
}

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
        dispatch(getProfilesStart());

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
