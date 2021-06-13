import { SET_CART, CLEAR_CART } from './types';
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
  .then(() => dispatch({type: CLEAR_CART}));
}

export const loadCart = (id) => dispatch => {
  axios.get(customersRoute + `/${id}/cart`)
  .then(({data}) => {
    dispatch({
      type: SET_CART,
      payload: { shoppingCart: data }
    })
  })
}

export const checkoutCart = (id, menuItems) => (dispatch) => {
  dispatch(clearCart(id));
  axios.post(customersRoute + `/${id}/orders`, JSON.stringify(menuItems), config)
  .then(({ data }) => {
    axios.get(customersRoute + `/${id}/orders`)
    .then(({data}) => console.log(data))
  })
  .catch();
}

export const deleteItem = (userId, menuItemId) => dispatch => {
  axios.delete(customersRoute + `/${userId}/cart/${menuItemId}`)
  .then(({data}) => dispatch({
    type: SET_CART,
    payload: {shoppingCart: data}
  }))
}
