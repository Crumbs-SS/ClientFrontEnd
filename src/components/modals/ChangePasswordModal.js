import {Modal} from "react-bootstrap";
import ChangePasswordForm from "../forms/ChangePasswordForm";

const ChangePasswordModal = (props) => {
    return(
        <>
            <Modal show={props.show} onHide={() => props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Your Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChangePasswordForm close={props.onHide} token={props.token} success={props.success}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ChangePasswordModal;
