import {combineReducers} from 'redux';
import searchReducer from './searchReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
   search: searchReducer,
   auth: authReducer,
   error: errorReducer,
});

export default rootReducer;
