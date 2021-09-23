const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const prodURL = "http://crumbs-alb-545824915.us-east-1.elb.amazonaws.com"

export const ACCOUNT_SERVICE_URL = isDevelopment ? "http://localhost:8080" : prodURL;
export const ORDER_SERVICE_URL = isDevelopment ? "http://localhost:8010" : prodURL;
export const PAYMENT_SERVICE_URL = isDevelopment ? "http://localhost:8090" : prodURL;
export const RESTAURANT_SERVICE_URL = isDevelopment ? "http://localhost:8070" : prodURL;
export const EMAIL_SERVICE_URL = isDevelopment ? "http://localhost:8100" : prodURL;