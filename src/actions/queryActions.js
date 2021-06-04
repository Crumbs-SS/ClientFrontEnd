import { SET_QUERY } from './types'

export const setQuery = (query = '') => {
    return {
        type: SET_QUERY,
        payload: {query},
    };
};
