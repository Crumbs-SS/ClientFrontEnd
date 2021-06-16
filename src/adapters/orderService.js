import axios from 'axios';

const url = 'http://localhost:8010';
const customersRoute = url +'/customers';


export default class OrderService{
  static loadOrders(id){
    return axios.get(customersRoute + `/${id}/orders`);
  }
}
