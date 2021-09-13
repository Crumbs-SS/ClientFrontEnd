import { Modal } from 'react-bootstrap';
import React from 'react';
import {Button} from "@material-ui/core";

const OrderModal = ({ order, show, onHide }) => {

    return (
        <>
            <Modal show={show} onHide={() => onHide()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton>
                    <Modal.Title>Order #{order? order.id : null}</Modal.Title>
                </Modal.Header>
                        {order ? order.foodOrders.map((foodItem, index) => {
                            return(
                            <>
                            <div key={index}>
                                <p><b> {foodItem.menuItem.name}</b> </p>
                                <p> {foodItem.preferences} </p>
                            </div>
                            
                          </>
                            )
                        }) 
                        : null}
                <Modal.Body>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="contained" color="secondary" onClick={() => onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
export default OrderModal;
