import { SET_CART, CLEAR_CART } from './types';
import { loadOrders } from './orderActions';
import CartService from '../adapters/cartService';
import EmailService from '../adapters/emailService';

export const addToCart = (id, menuItem) => (dispatch) => {
  CartService.addToCart(id, menuItem)
  .then(({data}) => {
    dispatch({
        type: SET_CART,
        payload: { shoppingCart: data }
     })
  })
  .catch();
}

export const clearCart = id => dispatch =>  {
  CartService.clearCart(id)
  .then(() => dispatch({type: CLEAR_CART}))
  .catch();
}

export const loadCart = (id) => dispatch => {
  CartService.loadCart(id)
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
  CartService.checkoutCart(id, body)
  .then((resp) => {
    const orders = resp.data;
    dispatch(loadOrders(id));
    orders.forEach((order) => EmailService.sendOrderDetailsEmail(order.id));
  }).catch();
}

export const deleteItem = (userId, menuItemId) => dispatch => {
  CartService.deleteItem(userId, menuItemId)
  .then(({data}) => dispatch({
    type: SET_CART,
    payload: {shoppingCart: data}
  }))
  .catch();
}
