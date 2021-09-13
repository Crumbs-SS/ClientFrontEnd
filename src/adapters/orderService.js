import axios from 'axios';
import store from '../store';

const url = 'http://localhost:8010';
const customersRoute = url +'/customers';

export default class OrderService{

  static get config(){
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().auth.token,
      }
    }
  }

  static get configWithUsername(){
    const config = {...this.config};
    config.headers.Username = this.username;
    return config;
  }

  static get username(){
    return store.getState().auth.username
  }

  static loadOrders(page){
    return axios.get(customersRoute + `/${this.username}/orders?page=${page}`, this.config);
  }

  static updateOrders(orderId, {phone, address, preferences, foodOrders}){
    const body = {phone, address, preferences, cartItems: foodOrders}
    return axios.put(url + `/orders/${orderId}`, JSON.stringify(body), this.configWithUsername);
  }

  static cancelOrder(id){
    return axios.delete(url + '/orders/' + id, this.configWithUsername);
  }

  static getAvailableOrders(){
    return axios.get(url + `/drivers/${this.username}/orders/available`, this.config);
  }

  static acceptOrder(orderId){
    return axios.post(url + `drivers/${this.username}/accepted-order`, JSON.stringify({orderId}), this.config);
  }

  static setPickedUpAt(orderId){
    return axios.put(url + `/drivers/${this.username}/order/${orderId}/pickUp`, null, this.config);
  }

  static fulfilOrder(orderId){
    return axios.put(url + `/drivers/${this.username}/order/${orderId}`, null, this.config);
  }

  static getDriverAcceptedOrder(driverId){
    return axios.get(url + `/drivers/${this.username}/accepted-order` + driverId, this.config);
  }

  static getDriverRating(orderId){
    return axios.get(url + '/orders/' + orderId + '/driver-rating', this.config);
  }

  static submitRating(orderId, rating, description){
    const body = {rating, description};
    return axios.post(url + '/orders/' + orderId + '/driver-rating', JSON.stringify(body), this.config);
  }
}
