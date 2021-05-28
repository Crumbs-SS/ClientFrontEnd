import axios from 'axios';
const url = 'http://localhost:8070';
const restaurantsRoute = url + '/restaurants';
const categoriesRoute = url + '/categories';
const restaurantsQueryRoute = restaurantsRoute + '/search';

class RestaurantService{

  static getRestaurants(query, page=0, sortOrder, filters){
    const sortBy = sortOrder ? sortOrder.sortBy : '';
    const order = sortOrder ? sortOrder.order : '';
    
    return axios.get(restaurantsQueryRoute+
      `?query=${query}&page=${page}&sortBy=${sortBy}&order=${order}&filter=${filters.join(',')}`
    );
  }

  static getCategories(){
    return axios.get(categoriesRoute);
  }

}

export default RestaurantService;
