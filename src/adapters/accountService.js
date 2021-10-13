import axios from 'axios';
import store from '../store';
import { ACCOUNT_SERVICE_URL } from '../globalVariables';

const url = ACCOUNT_SERVICE_URL;

export default class AccountService{

    static get config(){
        return { headers: {
            'Content-Type': 'application/json',
            'Authorization' : store.getState().auth.token}
        }
      }
    
    static get username(){
    return store.getState().auth.username
    }
    
    static checkInDriver () {
        return axios.put(url + `/drivers/checkIn/${this.username}`, null, this.config);
    }
    static checkOutDriver () {
        return axios.put(url + `/drivers/checkOut/${this.username}`, null, this.config);
    }
    static getDriverStatus  (){
        return axios.get(url + `/drivers/status/${this.username}`, this.config);
    }
    static getDriverPay () {
        return axios.get(url + `/drivers/pay/${this.username}`, this.config);
    }
    static getDriverRating () {
        return axios.get(url + `/drivers/rating/${this.username}`, this.config);
    }
    static getDriverRatings () {
        return axios.get(url + `/drivers/ratings/${this.username}`, this.config);
    }
    static forgotPassword(email){
        return axios.get(url + '/users/email/' + email, this.config);
    }
}
