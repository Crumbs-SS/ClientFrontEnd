import { SET_CART, CLEAR_CART } from './types';
import { loadOrders } from './orderActions';
import CartService from '../adapters/cartService';
import EmailService from '../adapters/emailService';

export const addToCart = (menuItem) => (dispatch) => {
  CartService.addToCart(menuItem)
  .then(({data}) => {
    dispatch({
        type: SET_CART,
        payload: { shoppingCart: data }
     })
  })
  .catch();
}

export const clearCart = () => dispatch =>  {
  CartService.clearCart()
  .then(() => dispatch({type: CLEAR_CART}))
  .catch();
}

export const loadCart = () => dispatch => {
  CartService.loadCart()
  .then(({data}) => {
    dispatch({
      type: SET_CART,
      payload: { shoppingCart: data }
    })
  })
  .catch();
}

export const checkoutCart = (cartItems, {phone, address, preferences, stripeID}) => (dispatch) => {
  dispatch(clearCart());
  const body = {
    phone,
    address,
    preferences,
    stripeID,
    cartItems
  }
  CartService.checkoutCart(body)
  .then((resp) => {
    const orders = resp.data;
    dispatch(loadOrders());
    orders.forEach((order) => EmailService.sendOrderDetailsEmail(order.id));
  }).catch();
}

export const deleteItem = (menuItemId) => dispatch => {
  CartService.deleteItem(menuItemId)
  .then(({data}) => dispatch({
    type: SET_CART,
    payload: {shoppingCart: data}
  }))
  .catch();
}
