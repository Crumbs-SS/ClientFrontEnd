const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const prodURL = "Application-Load-Balancer-1415291833.us-east-1.elb.amazonaws.com"


export const ACCOUNT_SERVICE_URL = (isDevelopment ? "http://localhost:8080" : prodURL) + '/account-service';
export const ORDER_SERVICE_URL = (isDevelopment ? "http://localhost:8010" : prodURL) + '/order-service';
export const PAYMENT_SERVICE_URL = (isDevelopment ? "http://localhost:8090" : prodURL) + '/payment-service';
export const RESTAURANT_SERVICE_URL = (isDevelopment ? "http://localhost:8070" : prodURL) + '/restaurant-service';
export const EMAIL_SERVICE_URL = (isDevelopment ? "http://localhost:8100" : prodURL) + '/email-service';