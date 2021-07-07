import axios from 'axios';
import {returnErrors} from './errorActions'
import { loadCart } from './cartActions';
import { loadOrders } from './orderActions';

import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_PENDING,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    CLEAR_REGISTRATION_STATUS,
    CLEAR_LOGIN_STATUS,
    USER_LOADED,
    USER_LOADING,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_FAIL,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FAIL,
    CLEAR_CART,
    CLEAR_ORDERS
} from './types';

const authURL = 'http://localhost:8080'
const accountURL = 'http://localhost:8090'

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    const id = getState().auth.id;

    axios.get(authURL + '/users/' + id)
        .then(res => {
          dispatch({type: USER_LOADED, payload: res.data});
          dispatch(loadCart(id));
          dispatch(loadOrders(id));
      })
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

    dispatch({ type: REGISTER_PENDING });

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

    dispatch({ type: REGISTER_PENDING });

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
            dispatch(returnErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};

export const registerOwner = ({username, password, email, firstName, lastName, phone}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({username, password, email, firstName, lastName, phone});

    axios.post(accountURL + '/owners/register', body, config)
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

    dispatch({ type: LOGIN_PENDING});

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

export const logout = () => dispatch => {
    dispatch({type: LOGOUT_SUCCESS});
    dispatch({type: CLEAR_CART});
    dispatch({type: CLEAR_ORDERS});
};

export const deleteAccount = (username, password) => (dispatch) => {
    const body = JSON.stringify({username, password});
    const config = {
        data: body,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    axios.delete(accountURL + '/customers', config)
        .then(res => {
            dispatch({
                type: ACCOUNT_DELETE_SUCCESS,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status, 'ACCOUNT_DELETE_FAIL'));
            dispatch({
                type: ACCOUNT_DELETE_FAIL,
            });
        });
}

export const updateProfile = ({username, email, firstName, lastName}) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({username, email, firstName, lastName});

    axios.put(accountURL + '/customers', body, config)
        .then(res => {
            dispatch({
                type: ACCOUNT_UPDATE_SUCCESS,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ACCOUNT_UPDATE_FAIL'));
            dispatch({
                type: ACCOUNT_UPDATE_FAIL,
            });
        });
};

export const clearRegistrationStatus = () => (dispatch) => {
    dispatch({ type: CLEAR_REGISTRATION_STATUS });
}

export const clearLoginStatus = () => (dispatch) => {
    dispatch({ type: CLEAR_LOGIN_STATUS });
}
