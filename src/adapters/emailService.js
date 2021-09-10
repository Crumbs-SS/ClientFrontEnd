import axios from 'axios';
const url = 'http://localhost:8100';

class EmailService{
    
    static confirmToken(token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
          };
        return axios.put(url+'/email/token/'+ token, null, config);
    }

    static sendOrderDetailsEmail(orderId){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
          };
        return axios.post(url + `/email/orders/${orderId}/details`, null, config);
    }
}
export default EmailService;