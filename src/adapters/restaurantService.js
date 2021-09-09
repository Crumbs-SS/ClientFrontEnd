import axios from 'axios';

const url = 'http://localhost:8070/';
const restaurantsRoute = url + 'restaurants';
const categoriesRoute = url + 'categories';
const restaurantsQueryRoute = restaurantsRoute + '/search';
const menuItemsRoute = restaurantsRoute + '/menuitems';

export default class RestaurantService{

  
  static getRestaurants(foodOption, {query, currentPage=0, sortOrder, filters}, token){
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
      }
    };
    const sortBy = sortOrder ? sortOrder.sortBy : '';
    const order = sortOrder ? sortOrder.order : '';
    const path = `?query=${query}&page=${currentPage}&sortBy=${sortBy}&order=${order}&filter=${filters.join(',')}`;

    return foodOption ? axios.get(menuItemsRoute + path)
    :  axios.get(restaurantsQueryRoute + path, config);
  }

  static getCategories(token){
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
      }
    };
    return axios.get(categoriesRoute, config);
  }
  static findRestaurant(restaurantId, token ){
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
      }
    };
    return axios.get(restaurantsRoute + `/${restaurantId}`, config);
  }
  
  static getOwnerRestaurants(username, token)  {
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
      }
    };
    return axios.get(url + 'owner/' + username + '/restaurants', config);
  }
  static requestDeleteRestaurant (username, id, token)  {
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
      }
    };
    return axios.delete(url + 'owner/' + username + '/restaurant/' + id, config);
  }
  static updateRestaurant  (username, id, body, token) {
    
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
      }
    };
    return axios.put(url + 'owner/' + username + '/restaurant/' + id,JSON.stringify(body), config);
  }

 
}


