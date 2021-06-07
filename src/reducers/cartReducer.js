import { ADD_TO_CART } from '../actions/types';

const initialState = {
  shoppingCart: []
}

const cartReducer = (state = initialState, action) => {

  switch(action.type){
    case ADD_TO_CART:
      const menuItem = action.payload.menuItem
        return{
          shoppingCart: [...state.shoppingCart, menuItem]
        }

    default:
      return state;
  }
}

export default cartReducer;
