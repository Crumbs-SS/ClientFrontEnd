const url = 'http://localhost:8080';
const restaurantsRoute = url + '/restaurants';
const restaurantsQueryRoute = restaurantsRoute + '/search';
// const menuitemsRoute = url + '/menuitems';

class RestaurantService{

  static getRestaurants(query, page=0){
    return fetch(restaurantsQueryRoute+`?query=${query}&page=${page}`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    })
  }

}

export default RestaurantService;
