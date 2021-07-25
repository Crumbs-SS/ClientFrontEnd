import { useEffect, useState } from 'react';
import OrderService from '../../adapters/orderService';
import AccountService from '../../adapters/accountService';
import React from 'react';
import Header from '../Header';

import {
    Button,
    ButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead
} from "@material-ui/core";

const DriverPage = () => {

    const [availableOrders, setAvailableOrders] = useState([]);
    const id = window.location.pathname.split('/driver/')[1].split('/homePage')[0];
    const [driverStatus, setDriverStatus] = useState(null);
    console.log(driverStatus);

    useEffect(() => {
        AccountService.getDriverStatus(id).then((res) => {
            setDriverStatus(res.data);
        })
    }, [])

    const checkIn = (id) => {
        AccountService.checkInDriver(id).then(() => {

        })
    }
    const checkOut = (id) => {
        AccountService.checkOutDriver(id).then(() => {

        })
    }

    const getAvailableOrders = () => {
        OrderService.getAvailableOrders().then(res => {
            setAvailableOrders(res.data);
        })
    }



    const orderList = availableOrders.map((order, index) => {
        return <TableRow key={order.id}>
            <TableCell>{index}</TableCell>
            <TableCell>{order.restaurant.location.street}, {order.restaurant.location.city}, {order.restaurant.location.state}</TableCell>
            <TableCell>{order.deliveryLocation.street}, {order.deliveryLocation.city}, {order.deliveryLocation.state}</TableCell>
            <TableCell></TableCell>
            <TableCell>
                <ButtonGroup>
                    <Button size="small" color="primary">Accept</Button>
                    <Button size="small" color="danger">Hide</Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    });

    if (driverStatus === 'UNVALIDATED') {
        return(
            <>
            <p>Your account has not been validated yet. We will send you an e-mail once our team was able to validate your account.</p>
            </>
        )

    }
    else {
        return (
            <>

                <Header />
                <div className="container p-3 my-3 ">
                    <div>
                        <h1>Welcome to your dashboard</h1>
                        <Button size="small" color="primary" onClick={() => { checkIn(id) }}>Check-In</Button>

                    </div>
                    <div>
                        <TableContainer aria-label="simple table" style={{ border: '1px solid black' }}>
                            <Table >
                                <TableHead>
                                    <TableRow  >
                                        <TableCell>Order #</TableCell>
                                        <TableCell>Restaurant Location</TableCell>
                                        <TableCell>Customer Location</TableCell>
                                        <TableCell>Estimated delivery time</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderList}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>

            </>
        );
    }


}
export default DriverPage;