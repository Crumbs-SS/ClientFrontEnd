import axios from 'axios';


const url = 'http://localhost:8010';
const customersRoute = url + '/customers';

const config = {
  headers: {
      'Content-Type': 'application/json',
  }
}


export default class CartService {

  static addToCart(id, menuItem){
    return axios.post(customersRoute+`/${id}/cart`,
      JSON.stringify(menuItem),
      config);
  }

  static clearCart(id){
    return axios.delete(customersRoute+`/${id}/cart`);
  }

  static loadCart(id){
    return axios.get(customersRoute + `/${id}/cart`);
  }

  static checkoutCart(id, body){
    return axios.post(customersRoute + `/${id}/orders`,
      JSON.stringify(body),
      config);
  }

  static deleteItem(userId, menuItemId){
    return axios.delete(customersRoute + `/${userId}/cart/${menuItemId}`);
  }

}
