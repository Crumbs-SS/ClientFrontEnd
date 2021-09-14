import { Modal } from 'react-bootstrap';
import React from 'react';
import { Button } from "@material-ui/core";

const formatPhoneNumber = number => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match)
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];

    return number;
}

const OrderModal = ({ order, show, onHide }) => {

    return (
        <>
            <Modal show={show} onHide={() => onHide()} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton>
                    <Modal.Title>Order #{order ? order.id : null}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {order ? 
                        [<h5 key={1}>Customer Information: </h5>,
                        <h6 key={2}>Name: {order.customer.userDetails.firstName} {order.customer.userDetails.lastName}</h6>,
                        <h6 key={3}>Location: {order.deliveryLocation.street}, {order.deliveryLocation.city}, {order.deliveryLocation.state}</h6>,
                        <h6 key={4}>Contact Details: {formatPhoneNumber(order.phone)}</h6>,
                        <br key={5}/>,
                        <h5 key={6}>Order: </h5>,
                        order.foodOrders.map((foodItem, index) => {
                        return (
                            <h6 key={6+index}>{foodItem.menuItem.name} - Special Instructions: {foodItem.preferences ? foodItem.preferences  : 'None'} </h6>
                        )
                    })]
                        : null}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="contained" color="secondary" onClick={() => onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
export default OrderModal;

