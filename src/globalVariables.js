const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const prodURL = process.env.REACT_APP_API_URL


console.log(prodURL);

export const RESTAURANT_SERVICE_URL = (isDevelopment ?
    process.env.REACT_APP_RESTAURANT_SERVICE_URL : prodURL) + '/restaurant-service';
    
export const PAYMENT_SERVICE_URL = (isDevelopment ? 
    process.env.REACT_APP_PAYMENT_SERVICE_URL : prodURL) + '/payment-service';

export const ACCOUNT_SERVICE_URL = (isDevelopment ? 
    process.env.REACT_APP_ACCOUNT_SERVICE_URL : prodURL) + '/account-service';

export const ORDER_SERVICE_URL = (isDevelopment ? 
    process.env.REACT_APP_ORDER_SERVICE_URL : prodURL) + '/order-service';

export const EMAIL_SERVICE_URL = (isDevelopment ? 
    process.env.REACT_APP_EMAIL_SERVICE_URL : prodURL) + '/email-service';
