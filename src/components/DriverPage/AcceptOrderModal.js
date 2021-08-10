import {Modal} from 'react-bootstrap';
import React, { useState } from 'react';
import {
    Button,
} from "@material-ui/core";
import OrderService from '../../adapters/orderService';

const AcceptOrderModal = ({driver_id, order, show, onHide, rerender}) => {

    const [error, setError] = useState(false);

    const acceptOrder = () => {
        OrderService.acceptOrder(driver_id, order.id)
        .then( (res) => {
            localStorage.setItem('accepted_order', JSON.stringify(res.data));
            rerender(false);
            onHide();
        })
        .catch(() => {
            setError(true);
        })
    }
    
    return (
            <Modal show={show} onHide={() => onHide()}size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Order Delivery</Modal.Title>
                    {error ? <p>Unable to accept this order at this time.</p> : null}
                </Modal.Header>
                
                <Modal.Body>
                
                    {order === null ? null : 
                    [
                        <h5 key={1}>Order Details:</h5>,
                        <h6 key={2}>Estimated total delivery time: 40 minutes</h6>,
                        <h6 key={3}>Total pay for this delivery: 5$</h6>,
                        <br key={4}/>,
                        <h5 key={5}>Customer Information</h5>, 
                        <h6 key={6}>Name: {order.customer.userDetails.firstName} {order.customer.userDetails.lastName}</h6>, 
                        <h6 key={7}>Location: {order.deliveryLocation.street}, {order.deliveryLocation.city}, {order.deliveryLocation.state}</h6>, 
                        <h6 key={8}>Contact Details: {order.phone}</h6>,
                        <br key={9}/>,
                        <h5 key={10}>Restaurant Information : </h5>, 
                        <h6 key={11}>Name: {order.restaurant.name}</h6>,
                        <h6 key={12}> Location: {order.restaurant.location.street}, {order.restaurant.location.city}, {order.restaurant.location.state}</h6> 
                    ]}

                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="contained" color="secondary" onClick={() => onHide()}>Cancel</Button>
                    &nbsp;&nbsp;
                    <Button variant="contained" color="primary" onClick={() => { acceptOrder() }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
    )
}

export default AcceptOrderModal;
