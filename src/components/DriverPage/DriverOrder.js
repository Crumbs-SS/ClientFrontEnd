import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Typography,
} from "@material-ui/core";
import OrderService from '../../adapters/orderService';

const useStyles = makeStyles((theme) => (
    {
        issueButton: {
            width: '300px',
            height: '30px'
        }
    }
));

const DriverOrder = ({ rerender }) => {

    const classes = useStyles();
    const order = JSON.parse(localStorage.getItem('accepted_order'));
    const [pickedUp, setPickedUp] = useState(false);

    const pickUp = () => {
        OrderService.setPickedUpAt(order.id).then(() => {
            setPickedUp(true);
        })
            .catch();

    }

    const fulfilOrder = () => {
        OrderService.fulfilOrder(order.id).then(() => {
            rerender(true);
        })
            .catch();

    }

    return (

        <React.Fragment>

            <Typography variant="h5" color="inherit" gutterBottom>
                Order Details:
            </Typography >

            <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>
                - Estimated total delivery time: {order.deliveryTime}
                <br /><br/>
                - Total pay for this delivery: {order.deliveryPay}$
                <br/><br/>
            </Typography>

            <Typography variant="h5" color="inherit" gutterBottom>
                Order Delivery Instructions:
            </Typography>

            <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>

                If any issue arises at any time during the delivery process, please click the button below to report an issue:
            </Typography>
            <Button variant="contained" color="secondary" className={classes.issueButton}>
                Report an Issue.
            </Button>
            {!pickedUp ?
                <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>
                    <br />
                    1. Go to {order.restaurant.name} restaurant located at: {order.restaurant.location.street}, {order.restaurant.location.city}, {order.restaurant.location.state}
                    <br /><br />
                    2. Pick up Order #{order.id}
                    <br /><br />
                    3.Once order is picked-up, press the confirm button below:
                    <br /><br />
                    <Button variant="contained" color="primary" className={classes.issueButton} onClick={() => { setPickedUp(true); pickUp(order.id) }}>
                        Confirm Order Pick-up
                    </Button>
                </Typography>
                :
                <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>
                    <br />
                    4. Deliver order to customer's address:
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {order.deliveryLocation.street}, {order.deliveryLocation.city}, {order.deliveryLocation.state}
                    <br /><br />
                    Customer Name: {order.customer.userDetails.firstName} {order.customer.userDetails.lastName}
                    <br />
                    Contact Details: {order.phone}
                    <br /><br />
                    5. Once order is delivered to customer, press the confirm button below:
                    <br /><br />
                    <Button disabled={!pickedUp} variant="contained" color="primary" className={classes.issueButton} onClick={() => fulfilOrder(order.id)}>
                        Confirm Order Delivery
                    </Button>
                </Typography>
            }
        </React.Fragment>


    )
}

export default DriverOrder;