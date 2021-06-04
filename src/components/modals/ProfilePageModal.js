import {Modal} from 'react-bootstrap';
import React from 'react';

const ProfilePageModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.comp}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProfilePageModal;
