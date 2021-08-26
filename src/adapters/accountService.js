import axios from 'axios';

const url = 'http://localhost:8080';

export default class AccountService{

    static checkInDriver = (username) => (getState) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().auth.token,
            }
        };
        return axios.put(url + '/drivers/checkIn/' + username, config);
    }
    static checkOutDriver = (username) => (getState) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().auth.token,
            }
        };
        return axios.put(url + '/drivers/checkOut/' + username, config);
    }
    static getDriverStatus = (username) => (getState) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().auth.token,
            }
        };
        return axios.get(url + '/drivers/status/' + username, config);
    }
    static getDriverPay = (username) => (getState) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getState().auth.token,
            }
        };
        return axios.get(url + '/drivers/pay/' + username, config);
    }
    static forgotPassword(email){
        return axios.get(url + '/users/email/' + email);
    }
}
