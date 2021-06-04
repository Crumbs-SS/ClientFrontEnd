import axios from 'axios';
import {returnErrors} from './errorActions'

import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING,
} from './types';

const authURL = 'http://localhost:8080'
const accountURL = 'http://localhost:8090'

export const loadUser = () => (dispatch, getState) => {
    console.log("load user");
    dispatch({type: USER_LOADING});

    const id = getState().auth.id;

    axios.get(authURL + '/users/' + id)
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

export const registerCustomer = ({username, password, email, firstName, lastName, phone}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({username, password, email, firstName, lastName, phone});

    axios.post(accountURL + '/customers/register', body, config)
        .then(res => {
            const id = res.headers['location'].split("/").slice(-1).pop();
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    id: id,
                },
            });
        })
        .catch(err => {
            console.log(err.response);
            dispatch(returnErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};

export const registerDriver = ({username, password, email, firstName, lastName, licenseId}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({username, password, email, firstName, lastName, licenseId});

    axios.post(accountURL + '/drivers/register', body, config)
        .then(res => {
            const id = res.headers['location'].split("/").slice(-1).pop();
            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    id: id,
                },
            });
        })
        .catch(err => {
            console.log(err.response);
            dispatch(returnErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};

export const login = ({username, password, role}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({username, password, role});

    axios.post(authURL + '/authenticate', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.headers['authorization'],
                    id: res.headers['userid'],
                    role: role,
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
