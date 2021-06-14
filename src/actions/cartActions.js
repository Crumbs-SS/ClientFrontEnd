import { SET_CART, CLEAR_CART } from './types';
import { loadOrders, setFreshOrders } from './orderActions';

import axios from 'axios';

const url = 'http://localhost:8010';
const customersRoute = url + '/customers';

const config = {
  headers: {
      'Content-Type': 'application/json',
  }
}

export const addToCart = (id, menuItem) => (dispatch) => {
  axios.post(customersRoute+`/${id}/cart`, JSON.stringify(menuItem), config)
  .then(({data}) => {
    dispatch({
        type: SET_CART,
        payload: { shoppingCart: data }
     })
  })
  .catch();
}

export const clearCart = id => dispatch =>  {
  axios.delete(customersRoute+`/${id}/cart`)
  .then(() => dispatch({type: CLEAR_CART}))
  .catch();
}

export const loadCart = (id) => dispatch => {
  axios.get(customersRoute + `/${id}/cart`)
  .then(({data}) => {
    dispatch({
      type: SET_CART,
      payload: { shoppingCart: data }
    })
  })
  .catch();
}

export const checkoutCart = (id, cartItems, {phone, address, preferences}) => (dispatch) => {
  dispatch(clearCart(id));
  const body = {
    phone,
    address,
    preferences,
    cartItems
  }
  axios.post(customersRoute + `/${id}/orders`, JSON.stringify(body), config)
  .then(({ data }) => {
    dispatch(setFreshOrders(data));
    dispatch(loadOrders(id));
  })
  .catch();
}

export const deleteItem = (userId, menuItemId) => dispatch => {
  axios.delete(customersRoute + `/${userId}/cart/${menuItemId}`)
  .then(({data}) => dispatch({
    type: SET_CART,
    payload: {shoppingCart: data}
  }))
  .catch();
}
