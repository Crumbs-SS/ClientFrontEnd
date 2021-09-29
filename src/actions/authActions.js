import axios from 'axios';
import {returnErrors} from './errorActions'
import { loadCart } from './cartActions';
import { loadOrders } from './orderActions';
import { ACCOUNT_SERVICE_URL } from '../globalVariables';

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

const accountURL = ACCOUNT_SERVICE_URL;

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    const username = getState().auth.username;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getState().auth.token,
        }
    };

    axios.get(accountURL + '/users/' + username, config)
        .then(res => {
          dispatch({type: USER_LOADED, payload: res.data});
          if(getState().auth.role === 'customer'){
            dispatch(loadCart());
            dispatch(loadOrders());
          }
      })
        .catch(err => {
            // dispatch(returnErrors(err.response.data, err.response.status));
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
            dispatch({
                type: REGISTER_SUCCESS,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};

export const registerDriver = ({username, password, email, firstName, lastName, licenseId, phone}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({username, password, email, firstName, lastName, licenseId, phone});

    dispatch({ type: REGISTER_PENDING });

    axios.post(accountURL + '/drivers/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
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
            dispatch({
                type: REGISTER_SUCCESS,
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
    console.log("Logging in!")
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({username, password, role});

    dispatch({ type: LOGIN_PENDING});

    axios.post(accountURL + '/authenticate', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.headers['authorization'],
                    username: res.headers['username'],
                    role: role,
                },
            });
            dispatch(loadUser());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL'));
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

export const deleteAccount = (username, password) => (dispatch, getState) => {
    const body = JSON.stringify({username, password});
    const config = {
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getState().auth.token,
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

export const updateProfile = ({username, email, firstName, lastName}) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getState().auth.token,
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
}

export const changePassword = (password, confirmationToken) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({password, confirmationToken});

    axios.post(accountURL + '/users/password/recover', body, config)
        .then(res => {
            dispatch({
                type: ACCOUNT_UPDATE_SUCCESS,
                payload: null,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ACCOUNT_UPDATE_FAIL'));
            dispatch({
                type: ACCOUNT_UPDATE_FAIL,
            });
        });
}

export const clearRegistrationStatus = () => (dispatch) => {
    dispatch({ type: CLEAR_REGISTRATION_STATUS });
}

export const clearLoginStatus = () => (dispatch) => {
    dispatch({ type: CLEAR_LOGIN_STATUS });
}
