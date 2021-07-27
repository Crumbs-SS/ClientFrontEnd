import {Modal} from 'react-bootstrap';
import React from 'react';

const AcceptOrderModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hello
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AcceptOrderModal;