import axios from 'axios';
const url = 'http://localhost:8070';
const restaurantsRoute = url + '/restaurants';
const categoriesRoute = url + '/categories';
const restaurantsQueryRoute = restaurantsRoute + '/search';
const menuItemsRoute = restaurantsRoute + '/menuitems';

class RestaurantService{

  static getRestaurants(foodOption, {query, currentPage=0, sortOrder, filters}){
    const sortBy = sortOrder ? sortOrder.sortBy : '';
    const order = sortOrder ? sortOrder.order : '';
    const path = `?query=${query}&page=${currentPage}&sortBy=${sortBy}&order=${order}&filter=${filters.join(',')}`;

    return foodOption ? axios.get(menuItemsRoute + path)
    :  axios.get(restaurantsQueryRoute + path);
  }

  static getCategories(){
    return axios.get(categoriesRoute);
  }
  static getOwnerRestaurants(id){
    return axios.get(url+'/owner/'+id+'/restaurants');
  }
  static deleteOwnerRestaurant(id){
    return axios.delete(restaurantsRoute+'/'+id);
  }
  static updateRestaurant(id, values,config){
    return axios.put(restaurantsRoute +'/'+id,values, config);
  }
  

  static findRestaurant(restaurantId){
    return axios.get(restaurantsRoute + `/${restaurantId}`);
  }

}

export default RestaurantService;
