import axios from 'axios';

const url = 'http://localhost:8080';

export default class AccountService{


    static checkInDriver (username) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
          };
        return axios.put(url + '/drivers/checkIn/' + username, null, config);
    }
    static checkOutDriver (username) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
          };
        return axios.put(url + '/drivers/checkOut/' + username, null, config);
    }
    static getDriverStatus  (username){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
          };
        return axios.get(url + '/drivers/status/' + username, config);
    }
    static getDriverPay (username) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
          };
        return axios.get(url + '/drivers/pay/' + username, config);
    }
    static forgotPassword(email){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
          };
        return axios.get(url + '/users/email/' + email, config);
    }
}
