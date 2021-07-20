import axios from 'axios';

const url = 'http://localhost:8010';
const customersRoute = url +'/customers';

const config = {
  headers: {
      'Content-Type': 'application/json',
  }
}


export default class OrderService{
  static loadOrders(id, page){
    return axios.get(customersRoute + `/${id}/orders?page=${page}`);
  }

  static updateOrders(id, orderId, {phone, address, preferences, foodOrders}){
    const body = {
      phone, address, preferences, cartItems: foodOrders
    }

    return axios.put(customersRoute + `/${id}/order/${orderId}`,
      JSON.stringify(body),
       config);
  }

  static cancelOrder(id){
    return axios.delete(customersRoute + '/orders/' + id);
  }

}
