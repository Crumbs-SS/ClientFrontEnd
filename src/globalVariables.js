const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const prodURL = process.env.API_URL

export const RESTAURANT_SERVICE_URL = (isDevelopment ?
    process.env.RESTAURANT_SERVICE_URL : prodURL) + '/restaurant-service';
    
export const PAYMENT_SERVICE_URL = (isDevelopment ? 
    process.env.PAYMENT_SERVICE_URL : prodURL) + '/payment-service';

export const ACCOUNT_SERVICE_URL = (isDevelopment ? 
    process.env.ACCOUNT_SERVICE_URL : prodURL) + '/account-service';

export const ORDER_SERVICE_URL = (isDevelopment ? 
    process.env.ORDER_SERVICE_URL : prodURL) + '/order-service';

export const EMAIL_SERVICE_URL = (isDevelopment ? 
    process.env.EMAIL_SERVICE_URL : prodURL) + '/email-service';


