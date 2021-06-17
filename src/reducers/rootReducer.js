import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import queryReducer from './queryReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
   auth: authReducer,
   error: errorReducer,
   search: queryReducer,
   cart: cartReducer,
   ordersState: orderReducer
});

export default rootReducer;
