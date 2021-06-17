import { SET_CART, CLEAR_CART } from '../actions/types';

const initialState = {
  shoppingCart: [],
  total: 0
}

const cartReducer = (state = initialState, action) => {

  switch(action.type){
    case SET_CART:
      const shoppingCart = action.payload.shoppingCart;

      const total = shoppingCart ? getTotal(shoppingCart) : 0;
      return{ total,shoppingCart}
    case CLEAR_CART:
      return {
        total: 0,
        shoppingCart: []
      }
    default:
      return state;
  }

}

const getTotal = (shoppingCart) => shoppingCart.reduce(
  (total, {menuItem}) => total + menuItem.price, 0);

export default cartReducer;
