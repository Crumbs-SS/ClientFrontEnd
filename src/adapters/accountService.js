import axios from 'axios';
import store from '../store';

const url = 'http://localhost:8080';

export default class AccountService{

    static get config(){
        return { headers: {
            'Content-Type': 'application/json',
            'Authorization' : store.getState().auth.token}
        }
      }

    static checkInDriver (username) {
        return axios.put(url + '/drivers/checkIn/' + username, null, this.config);
    }
    static checkOutDriver (username) {
        return axios.put(url + '/drivers/checkOut/' + username, null, this.config);
    }
    static getDriverStatus  (username){
        return axios.get(url + '/drivers/status/' + username, this.config);
    }
    static getDriverPay (username) {
        return axios.get(url + '/drivers/pay/' + username, this.config);
    }
    static getDriverRating (username) {
        return axios.get(url + '/drivers/rating/' + username, this.config);
    }
    static getDriverRatings (username) {
        return axios.get(url + '/drivers/ratings/' + username, this.config);
    }
    static forgotPassword(email){
        return axios.get(url + '/users/email/' + email, this.config);
    }
}
