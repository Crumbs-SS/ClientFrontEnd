import { ADD_TO_CART } from './types';

export const addToCart = menuItem => {
  return {
    type: ADD_TO_CART,
    payload: { menuItem }
  }
}
