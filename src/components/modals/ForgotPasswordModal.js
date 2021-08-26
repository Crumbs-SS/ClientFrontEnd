import {Modal} from "react-bootstrap";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";

const ForgotPasswordModal = (props) => {
    return(
        <>
            <Modal show={props.show} onHide={() => props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Email to Recover Your Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ForgotPasswordForm close={props.onHide}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ForgotPasswordModal;
