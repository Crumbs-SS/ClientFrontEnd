//import '../style/login-page.css';
import {Modal} from 'react-bootstrap';
import React from 'react';

const RegistrationModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Become a new {props.role}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.comp}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RegistrationModal;
