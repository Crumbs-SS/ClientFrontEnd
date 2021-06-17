import { SET_QUERY, SET_FOOD_OPTION } from '../actions/types';

const initialState = {
  query: '',
  foodSearchOption: false
}

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_QUERY:
          return {
            ...state,
            query: action.payload.query
          };
      case SET_FOOD_OPTION:
        return {
          ...state,
          foodSearchOption: action.payload.foodSearchOption
        }
      default:
          return state;
  }
};


export default queryReducer;
