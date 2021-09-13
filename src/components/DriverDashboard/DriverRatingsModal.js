import { Modal } from 'react-bootstrap';
import React from 'react';
import {Button} from "@material-ui/core";
import DriverRatingsTable from './DriverRatingsTable';

const DriverRatingsModal = ({ driverRatings, show, onHide }) => {

    return (
        <>
            <Modal show={show} onHide={() => onHide()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton>
                    <Modal.Title>Your Driver Ratings</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <DriverRatingsTable driverRatings={driverRatings}></DriverRatingsTable>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="contained" color="secondary" onClick={() => onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
export default DriverRatingsModal;
