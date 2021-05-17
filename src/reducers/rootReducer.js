import { combineReducers } from 'redux';
// import userReducer from './userReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
   search: searchReducer
})

export default rootReducer;
