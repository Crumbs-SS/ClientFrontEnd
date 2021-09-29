import axios from 'axios';
import store from '../store';
import { ORDER_SERVICE_URL } from '../globalVariables';

const url = ORDER_SERVICE_URL;
const customersRoute = url + '/customers';

export default class CartService {

  static get config(){
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().auth.token,
      }
    }
  }

  static get username(){
    return store.getState().auth.username
  }

  static addToCart(menuItem){
    return axios.post(customersRoute+`/${this.username}/cart`, JSON.stringify(menuItem), this.config);
  }

  static clearCart(){
    return axios.delete(customersRoute+`/${this.username}/cart`, this.config);
  }

  static loadCart(){
    return axios.get(customersRoute + `/${this.username}/cart`, this.config);
  }

  static checkoutCart(body){
    return axios.post(customersRoute + `/${this.username}/orders`, JSON.stringify(body), this.config);
  }

  static deleteItem(menuItemId){
    return axios.delete(customersRoute + `/${this.username}/cart/${menuItemId}`, this.config);
  }

}
