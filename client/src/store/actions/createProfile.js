import axios from 'axios';

import { loading, getErrors } from './profiles';

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
