import React, { useEffect, useState } from "react";
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import OrderService from '../adapters/orderService';
import {
    Button,
    ButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    Link,
    Nav,
    Badge
} from "@material-ui/core";
import AcceptOrderModal from "./modals/AcceptOrderModal";
const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
    }
}));

const AvailableOrders = (props) => {
    
    const [availableOrders, setAvailableOrders] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        OrderService.getAvailableOrders().then(res => {
            setAvailableOrders(res.data);
        })
    }, [])

    const orderList = availableOrders.map((order, index) => {
        return <TableRow key={order.id}>
            <TableCell>{index}</TableCell>
            <TableCell>{order.restaurant.location.street}, {order.restaurant.location.city}, {order.restaurant.location.state}</TableCell>
            <TableCell>{order.deliveryLocation.street}, {order.deliveryLocation.city}, {order.deliveryLocation.state}</TableCell>
            <TableCell>40 minutes</TableCell>
            <TableCell>5$</TableCell>
            <TableCell>
                <Button size="small" color="primary" variant="contained" onClick= {() => props.modalShow()}>Accept</Button>
            </TableCell>
        </TableRow>
    });

    return (
        <React.Fragment>
            <Typography component="h1" variant="h6" color="inherit"  className={classes.title}>
                Available Orders:
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Order #</TableCell>
                        <TableCell>Restaurant Location</TableCell>
                        <TableCell>Customer Location</TableCell>
                        <TableCell>Estimated delivery time</TableCell>
                        <TableCell>Pay</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderList}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
export default AvailableOrders;