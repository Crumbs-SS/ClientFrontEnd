import { SET_ORDERS } from './types';
import OrderService from '../adapters/orderService';

export const loadOrders = (id) => dispatch => {
  OrderService.loadOrders(id)
  .then(({data}) => {
    dispatch({
      type: SET_ORDERS,
      payload: {
        orders: data.orders,
        activeOrders: data.activeOrders,
        inactiveOrders: data.inactiveOrders
       }
    })

  })
  .catch();
}
