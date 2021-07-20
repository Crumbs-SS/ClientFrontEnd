import axios from 'axios';
const url = 'http://localhost:8100';
class EmailService{

    static confirmToken(token){
        return axios.get(url+'/email/token/'+ token);
    }
3

}
export default EmailService;