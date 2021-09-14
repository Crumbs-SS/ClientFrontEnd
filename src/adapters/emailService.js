import axios from 'axios';
import store from '../store';

const url = 'http://localhost:8100';

class EmailService{

    static get config(){
        return { headers: {
            'Content-Type': 'application/json',
            'Authorization' : store.getState().auth.token}
        }
      }
    
    static confirmToken(token) {
        return axios.put(url+'/email/token/'+ token, null, this.config);
    }

    static sendOrderDetailsEmail(orderId){
        const config = {...this.config};
        config.headers.Username = store.getState().auth.username;

        return axios.post(url + `/email/orders/${orderId}/details`, {}, config);
    }
}
export default EmailService;