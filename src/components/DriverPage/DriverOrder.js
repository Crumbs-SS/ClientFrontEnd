import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Button,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => (
    {
        issueButton: {
            width: '300px',
            height: '30px'
        }
    }
));

const DriverOrder = ({order}) => {
    
    const classes = useStyles();
    
    return (
        <>
            <React.Fragment>
                
                {/* <Typography  variant="h5" color="inherit" gutterBottom>
                    Order Details:
                </Typography >
                    
                <Typography variant="body1" gutterBottom>
                    - Estimated total delivery time: 40 minutes
                    <br/>
                    - Total pay for this delivery: 5$
                </Typography>

                <Typography variant="h6" color="inherit" gutterBottom>
                    Customer Details:
                </Typography>

                <Typography variant="body1" gutterBottom>
                    - Name: {order.customer.userDetails.firstName} {order.customer.userDetails.lastName}
                    <br/>
                    - Location: {order.deliveryLocation.street}, {order.deliveryLocation.city}, {order.deliveryLocation.state}
                    <br/>
                    - Contact Details: {order.phone}
                </Typography>

                <Typography variant="h6" color="inherit" gutterBottom>
                    Restaurant Information : 
                </Typography>

                <Typography variant="body1" gutterBottom>
                    - Name: {order.restaurant.name}
                    <br/>
                    - Location: {order.restaurant.location.street}, {order.restaurant.location.city}, {order.restaurant.location.state}
                </Typography> */}

                <Typography  variant="h5" color="inherit" gutterBottom>
                    Order Delivery Instructions:
                </Typography>
                
                <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>
                    
                   If any issue arises at any time during the delivery process, please click the button below to report an issue:
                </Typography>
                <Button variant="contained" color="secondary" className={classes.issueButton}>
                    Report an Issue.
                </Button>

                <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>
                    <br/>
                    1. Go to {order.restaurant.name} restaurant located at: {order.restaurant.location.street}, {order.restaurant.location.city}, {order.restaurant.location.state} 
                    <br/><br/>
                    2. Pick up Order #{order.id}
                    <br/><br/>
                    3. Deliver order to customer's address:
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {order.deliveryLocation.street}, {order.deliveryLocation.city}, {order.deliveryLocation.state}
                    <br/><br/>
                    Customer Name: {order.customer.userDetails.firstName} {order.customer.userDetails.lastName}
                    <br/>
                    Contact Details: {order.phone}
                    <br/><br/>
                    4. Once order is delivered to customer, press the confirm button below:
                </Typography>
                
                <Button variant="contained" color="primary" className={classes.issueButton}>
                    Confirm Order Delivery
                </Button>
                
            </React.Fragment>

        </>
    )
}

export default DriverOrder;