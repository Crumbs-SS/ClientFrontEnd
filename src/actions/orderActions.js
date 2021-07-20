import { SET_ORDERS } from './types';
import OrderService from '../adapters/orderService';

export const loadOrders = (id, page=0) => dispatch => {
  OrderService.loadOrders(id, page)
  .then(({data}) => {
    dispatch({
      type: SET_ORDERS,
      payload: {
        activeOrders: data.activeOrders,
        inactiveOrders: data.inactiveOrders
       }
    })

  })
  .catch();
}

export const updateOrder = (userId, orderId, fields, page) => dispatch => {
  OrderService.updateOrders(userId, orderId, fields)
  .then(() => dispatch(loadOrders(userId, page)))
  .catch();
}

export const cancelOrder = (orderId, userId) => dispatch =>
{
  OrderService.cancelOrder(orderId)
  .then(() => dispatch(loadOrders(userId)))
  .catch();
}