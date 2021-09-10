import axios from 'axios';
import store from '../store';

const url = 'http://localhost:8070/';
const restaurantsRoute = url + 'restaurants';
const categoriesRoute = url + 'categories';
const restaurantsQueryRoute = restaurantsRoute + '/search';
const menuItemsRoute = restaurantsRoute + '/menuitems';

export default class RestaurantService{

  static get config(){
    return { headers: {
        'Content-Type': 'application/json',
        'Authorization' : store.getState().auth.token}
    }
  }

  static getRestaurants(foodOption, {query, currentPage=0, sortOrder, filters}){
   
    const sortBy = sortOrder ? sortOrder.sortBy : '';
    const order = sortOrder ? sortOrder.order : '';
    const path = `?query=${query}&page=${currentPage}&sortBy=${sortBy}&order=${order}&filter=${filters.join(',')}`;

    return foodOption ? axios.get(menuItemsRoute + path)
    :  axios.get(restaurantsQueryRoute + path, this.config);
  }

  static getCategories(){
    return axios.get(categoriesRoute, this.config);
  }

  static findRestaurant(restaurantId){
    return axios.get(restaurantsRoute + `/${restaurantId}`, this.config);
  }
  
  static getOwnerRestaurants(username)  {
    return axios.get(url + 'owner/' + username + '/restaurants', this.config);
  }

  static requestDeleteRestaurant (username, id)  {
    return axios.delete(url + 'owner/' + username + '/restaurant/' + id, this.config);
  }

  static updateRestaurant  (username, id, body) {
    return axios.put(url + 'owner/' + username + '/restaurant/' + id, JSON.stringify(body), this.config);
  }

 
}


