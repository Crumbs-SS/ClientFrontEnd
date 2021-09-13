import { SET_ORDERS } from './types';
import OrderService from '../adapters/orderService';

export const loadOrders = (page=0) => dispatch => {
  OrderService.loadOrders(page)
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

export const updateOrder = (orderId, fields, page) => dispatch => {
  OrderService.updateOrders(orderId, fields)
  .then(() => dispatch(loadOrders(page)))
  .catch();
}

export const cancelOrder = (orderId) => dispatch =>
{
  OrderService.cancelOrder(orderId)
  .then(() => dispatch(loadOrders()))
  .catch();
}