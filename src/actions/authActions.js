import axios from 'axios';
import {returnErrors} from './errorActions'

import {AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, USER_LOADED, USER_LOADING,} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    const id = getState().auth.id;

    axios.get('http://localhost:8080/users/' + id)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR,
            });
        });
}

export const login = ({username, password, role}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({username, password, role});

    axios.post('http://localhost:8080/authenticate', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.headers['authorization'],
                    id: res.headers['userid'],
                },
            });
            dispatch(loadUser());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};

export const logout = () => {
    return {type: LOGOUT_SUCCESS};
};
