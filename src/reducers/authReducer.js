import {
    AUTH_ERROR,
    LOGIN_PENDING,
    LOGIN_FAIL,
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
    ACCOUNT_UPDATE_SUCCESS,
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    id: localStorage.getItem('id'),
    user: null,
    role: localStorage.getItem('role'),
    isAuthenticated: null,
    isLoading: false,
    registerSuccess: false,
    loginSuccess: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
        case LOGIN_PENDING:
            return {
                ...state,
                isLoading: true,
                loginSuccess: false,
            };
        case REGISTER_PENDING:
            return {
                ...state,
                isLoading: true,
                registerSuccess: false,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('id', action.payload.id);
            localStorage.setItem('role', action.payload.role);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                loginSuccess: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                registerSuccess: true,
            };
        case ACCOUNT_UPDATE_SUCCESS:
            return {
              ...state,
              user: action.payload,
            };
        case CLEAR_LOGIN_STATUS:
            return {
                ...state,
                loginSuccess: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case CLEAR_REGISTRATION_STATUS:
        case ACCOUNT_DELETE_SUCCESS:
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            return {
                ...state,
                token: null,
                id: null,
                user: null,
                role: null,
                isAuthenticated: false,
                isLoading: false,
                registerSuccess: false,
            };
        default:
            return state;
    }
}

export default authReducer;
