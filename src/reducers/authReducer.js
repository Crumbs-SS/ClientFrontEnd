import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING,
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    id: localStorage.getItem('id'),
    user: null,
    role: null,
    isAuthenticated: null,
    isLoading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
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
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
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
            };
        default:
            return state;
    }
}

export default authReducer;