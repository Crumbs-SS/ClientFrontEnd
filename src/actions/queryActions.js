import { SET_QUERY, SET_FOOD_OPTION } from './types'

export const setQuery = (query = '') => {
    return {
        type: SET_QUERY,
        payload: {query}
    };
};

export const setFoodSearchOption = (foodSearchOption = false) => {
    return {
        type: SET_FOOD_OPTION,
        payload: {foodSearchOption}
    };
};
