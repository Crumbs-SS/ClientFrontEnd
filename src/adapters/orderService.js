import axios from 'axios';

const url = 'http://localhost:8010';
const customersRoute = url +'/customers';

const config = {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
  }
}


export default class OrderService{
  static loadOrders(id, page){
    return axios.get(customersRoute + `/${id}/orders?page=${page}`);
  }

  static updateOrders(orderId, {phone, address, preferences, foodOrders}){
    const body = {
      phone, address, preferences, cartItems: foodOrders
    }

    return axios.put(url + `/orders/${orderId}`,
      JSON.stringify(body), config);
  }

  static cancelOrder(id){
    return axios.delete(customersRoute + '/orders/' + id);
  }
  static getAvailableOrders(){
    return axios.get(url + '/drivers/available/orders');
  }
  static acceptOrder(driver_id, order_id){
    return axios.put(url + '/drivers/' + driver_id + '/order/' + order_id);
  }
  static setPickedUpAt(order_id){
    return axios.put(url + '/drivers/order/' + order_id + '/pickUp');
  }
  static fulfilOrder(order_id){
    return axios.put(url + '/drivers/order/' + order_id);
  }
  static getDriverAcceptedOrder(driver_id){
    return axios.get(url + '/drivers/order/' + driver_id);
  }
  static getDriverRating(order_id){
    return axios.get(url + '/orders/' + order_id + '/driver/rating');
  }
  static submitRating(order_id, rating, description){
    const body = {rating, description};
    return axios.post(url + '/orders/' + order_id + '/driver/rating', JSON.stringify(body), config);
  }
  static getRecentOrders(){
    
  }



}
