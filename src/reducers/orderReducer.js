import { SET_ORDERS, SET_FRESH_ORDERS, CLEAR_ORDERS } from '../actions/types';


const initialState = {
  orders: [],
  activeOrders: [],
  inactiveOrders: [],
  freshOrders: []
}

const orderReducer = (state = initialState, action) => {

  switch(action.type){
    case SET_ORDERS:
      return{
        ...state,
        orders: action.payload.orders,
        activeOrders: action.payload.activeOrders,
        inactiveOrders: action.payload.inactiveOrders
      }
    case SET_FRESH_ORDERS:
      return{
        ...state,
        freshOrders: action.payload.orders
      }
    case CLEAR_ORDERS:
      return{
        orders: [],
        activeOrders: [],
        inactiveOrders: [],
        freshOrders: []
      }
    default:
      return state;
  }

}

export default orderReducer;
