import React, { useEffect, useState } from "react";
import {makeStyles} from '@material-ui/core/styles';
import OrderService from '../../adapters/orderService';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    Typography,
} from "@material-ui/core";
import AcceptOrderModal from "./AcceptOrderModal";
const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
    }
}));

const AvailableOrders = ({driver_id, setAcceptedOrder}) => {
    
    const [availableOrders, setAvailableOrders] = useState([]);
    const classes = useStyles();
    
    const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
    const hideAcceptOrderModal = () => setShowAcceptOrderModal(false);
    const[selectedOrder, setSelectedOrder] = useState(null);
    

    useEffect(() => {
        OrderService.getAvailableOrders().then(res => {
            setAvailableOrders(res.data);
        })
    }, [])

    const orderList = availableOrders.map((order, index) => {
        return <TableRow key={order.id}>
            <TableCell>{index}</TableCell>
            <TableCell>40 minutes</TableCell>
            <TableCell>5$</TableCell>
            <TableCell>
                <Button size="small" color="primary" variant="contained" onClick= {()=> {setSelectedOrder(order); setShowAcceptOrderModal(true)}}>View</Button>
            </TableCell>
        </TableRow>
    });

    return (
        <React.Fragment>
             <AcceptOrderModal show={showAcceptOrderModal} onHide={hideAcceptOrderModal} order={selectedOrder} driver_id={driver_id} setAcceptedOrder={setAcceptedOrder}></AcceptOrderModal>
            <Typography component="h1" variant="h6" color="inherit"  className={classes.title}>
                Available Orders:
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Order #</TableCell>
                        <TableCell>Estimated delivery time</TableCell>
                        <TableCell>Delivery Pay</TableCell>
                        <TableCell></TableCell>
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