import axios from 'axios';
const url = 'http://localhost:8100';
class EmailService{
    static confirmToken(token){
        return axios.get(url+'/email/token/'+ token);
    }

    static sendOrderDetailsEmail(orderId){
        return axios.post(url + `/email/orders/${orderId}/details`);
    }
}
export default EmailService;