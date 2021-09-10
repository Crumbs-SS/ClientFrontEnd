import axios from 'axios';
const url = 'http://localhost:8090';

export default class PaymentService{
  
  static createPaymentIntent(username, cartTotal){
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
      }
    };
    
    const body = {cartTotal};
    return axios.post(url + '/create-payment-intent/' + username, body, config);
  }
}