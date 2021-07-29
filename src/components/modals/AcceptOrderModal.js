import {Modal} from 'react-bootstrap';
import React, { useState } from 'react';
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
    Badge,
    Nav
} from "@material-ui/core";
import OrderService from '../../adapters/orderService';

const AcceptOrderModal = (props) => {

    const [error, setError] = useState(false);

    const acceptOrder = () => {
        OrderService.acceptOrder(props.driver_id, props.order.id)
        .then( (res) => {
            props.acceptedOrder(res.data);
            props.onHide();

        })
        .catch(() => {
            setError(true);
        })
    }
    
    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()}size="md"
      aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Order Delivery</Modal.Title>
                    {error ? <p>Unable to accept this order at this time.</p> : null}
                </Modal.Header>
                <Modal.Body>
                
                    {props.order === null ? null : 
                    [
                        <h5>Order Details:</h5>,
                        <p>Created at: {props.order.createdAt}</p>,
                        
                        <h5>Customer Information</h5>, 
                        <p>Name: {props.order.customer.userDetails.firstName} {props.order.customer.userDetails.lastName}</p>, 
                        <p>Location: {props.order.deliveryLocation.street}, {props.order.deliveryLocation.city}, {props.order.deliveryLocation.state}</p>, 
                        <p>Contact Details: {props.order.phone}</p>,
                        
                        <h5>Restaurant Information : </h5>, 
                        <p>Name: {props.order.restaurant.name}</p>,
                        <p>Location: {props.order.restaurant.location.street}, {props.order.restaurant.location.city}, {props.order.restaurant.location.state}</p> 
                    ]}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="secondary" onClick={() => props.onHide()}>Cancel</Button>
                    &nbsp;&nbsp;
                    <Button variant="contained" color="primary" onClick={() => { acceptOrder() }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AcceptOrderModal;
