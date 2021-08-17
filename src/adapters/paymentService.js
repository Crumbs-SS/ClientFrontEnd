import axios from 'axios';
const url = 'http://localhost:8090';

const config = {
  headers: {
      'Content-Type': 'application/json',
  }
}

export default class PaymentService{
  
  static createPaymentIntent(cartTotal){
    return axios.post(url + '/create-payment-intent',
      JSON.stringify(cartTotal), config);
  }
}