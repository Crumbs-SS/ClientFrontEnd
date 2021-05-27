import axios from 'axios';
const url = 'http://localhost:8080';
const restaurantsRoute = url + '/restaurants';
const categoriesRoute = url + '/categories';
const restaurantsQueryRoute = restaurantsRoute + '/search';

class RestaurantService{

  static getRestaurants(query, page=0, sortOrder, filters){
    let sortBy = '';
    let order = '';
    if(sortOrder){
      sortBy = sortOrder.sortBy;
      order = sortOrder.order;
    }
    return axios.get(restaurantsQueryRoute+
      `?query=${query}&page=${page}&sortBy=${sortBy}&order=${order}&filter=${filters.join(',')}`
    );
  }

  static getCategories(){
    return axios.get(categoriesRoute);
  }

}

export default RestaurantService;
