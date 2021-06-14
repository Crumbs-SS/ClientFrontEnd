import { SET_ORDERS, SET_FRESH_ORDERS } from './types';
import axios from 'axios';

const url = 'http://localhost:8010';
const customersRoute = url +'/customers';


export const loadOrders = (id) => dispatch => {
  axios.get(customersRoute + `/${id}/orders`)
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

export const setFreshOrders = (orders) => {
  return{
    type: SET_FRESH_ORDERS,
    payload: {orders}
  }
}
