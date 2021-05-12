const url = 'http://localhost:8080';
const restaurantsRoute = url + '/restaurants';
const menuitemsRoute = url + '/menuitems';

class RestaurantService{

  static getRestaurants(query){
    return fetch(restaurantsRoute+`?query=${query}` , {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    })
  }

}

export default RestaurantService;
