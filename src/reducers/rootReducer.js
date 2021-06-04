import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import queryReducer from './queryReducer';

const rootReducer = combineReducers({
   auth: authReducer,
   error: errorReducer,
   search: queryReducer
});

export default rootReducer;
