//import '../style/login-page.css';
import { Button, Modal } from 'react-bootstrap';
import LoginForm from './LoginForm'

const LoginModal = (props) => {
  return(
    <>
      <Modal show={props.show} onHide={() => props.onHide()}>
        <Modal.Header closeButton>
            <Modal.Title>Login as {props.role}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LoginForm role={props.role} close={props.onHide}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => props.onHide()}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LoginModal;