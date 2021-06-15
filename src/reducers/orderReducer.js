import { SET_ORDERS, CLEAR_ORDERS } from '../actions/types';


const initialState = {
  orders: [],
  activeOrders: [],
  inactiveOrders: [],
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
