import axios from 'axios';
const url = 'http://localhost:8090';


export default class PaymentService{
  
  static createPaymentIntent(cartTotal){
    
    const body = {cartTotal};
    
    const config = {
      
      headers: {
          'Content-Type': 'application/json',
      }
    }
    
    return axios.post(url + '/create-payment-intent', body, config);
  }
}