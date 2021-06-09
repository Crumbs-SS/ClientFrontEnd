import {Modal} from 'react-bootstrap';
import React from 'react';

const UpdateRestaurantModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Your Restaurant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.body}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateRestaurantModal;

