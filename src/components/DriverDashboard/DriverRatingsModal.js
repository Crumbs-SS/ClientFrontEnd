import { Modal } from 'react-bootstrap';
import React from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
} from "@material-ui/core";

const DriverRatingsModal = ({ driverRatings, show, onHide }) => {



    return (
        <>
            <Modal show={show} onHide={() => onHide()} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton>
                    <Modal.Title>Your Driver Ratings</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <TableContainer aria-label="simple table" style={{}}>
                        <Table >
                            <TableHead>
                                <TableRow  >
                                    <TableCell>Delivered on</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {driverRatings ? driverRatings.map(rating => {
                                    return <TableRow key={rating.id}>
                                        <TableCell>{rating.order.createdAt}</TableCell>
                                        <TableCell>{rating.rating}</TableCell>
                                        <TableCell>{rating.description}</TableCell>
                                    </TableRow>
                                }) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Modal.Body>

                <Modal.Footer>
                    <Button variant="contained" color="secondary" onClick={() => onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );

}
export default DriverRatingsModal;
