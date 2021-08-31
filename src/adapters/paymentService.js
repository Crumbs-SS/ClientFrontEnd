import axios from 'axios';
const url = 'http://localhost:8090';


export default class PaymentService{
  
  static createPaymentIntent(cartTotal, token){
    
    const body = {cartTotal};
    
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
      }
    }
    
    return axios.post(url + '/create-payment-intent', body, config);
  }
}