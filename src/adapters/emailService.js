import axios from 'axios';
import store from '../store';
import { EMAIL_SERVICE_URL } from '../globalVariables';

const url = EMAIL_SERVICE_URL;

class EmailService{

    static get config(){
        return { headers: {
            'Content-Type': 'application/json',
            'Authorization' : store.getState().auth.token}
        }
      }
    
    static confirmToken(token) {
        return axios.put(url+'/confirmation/token/'+ token, null, this.config);
    }

    static sendOrderDetailsEmail(orderId){
        const config = {...this.config};
        config.headers.Username = store.getState().auth.username;

        return axios.post(url + `/orders/${orderId}/details`, {}, config);
    }
}
export default EmailService;