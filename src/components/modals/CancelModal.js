import { Modal, Button} from 'react-bootstrap';

const CancelModal = props => {

    const {order, onCancel} = props;

    return (
        <Modal show={props.show} onHide={() => props.onHide()}>
            <Modal.Header closeButton>
                <Modal.Title> Are you sure you wish to cancel your order from {order ? order.restaurant.name : null} ?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button
                    onClick={() => onCancel(order.orderId, order.userId )}
                    variant='danger'
                    className='add-to-cart'
                >
                    Cancel Order
                </Button>

            </Modal.Footer>
        </Modal>
    )
}
export default CancelModal;