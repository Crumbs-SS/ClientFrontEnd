import axios from 'axios';
import store from '../store';

const url = 'http://localhost:8090';

export default class PaymentService{

  static get config(){
    return { headers: {
        'Content-Type': 'application/json',
        'Authorization' : store.getState().auth.token}
    }
  }
  
  static createPaymentIntent(username, cartTotal){
    const body = {cartTotal};
    return axios.post(url + '/create-payment-intent/' + username, body, this.config);
  }
}