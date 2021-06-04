import { SET_QUERY } from '../actions/types';

const initialState = {
  query: ''
}

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_QUERY:
          return {
            query: action.payload.query
          };
      default:
          return state;
  }
};


export default queryReducer;
