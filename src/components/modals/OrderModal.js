import { Modal, Button } from 'react-bootstrap';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const OrderModal = ({show, order, onHide}) => {
  return(
    <div className='order-modal'>
      <Modal show={show} onHide={onHide} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title> Order from {order ? order.restaurant.name : null} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b> Items </b>
          <br />
          <br />
          <div id='restaurant-components-cm'>
            { order ? order.foodOrders.map((item) => <FoodItemComponent foodItem={item} key={item.id} />) : null}
          </div>

        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={onHide}
            variant='danger'
            classNmae='add-to-cart'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )

}

export default OrderModal;

const FoodItemComponent = ({foodItem}) => {
  return(
    <>
    <div className='details-sc'>
      <div className='name-description'>
        <p className='om-name'><b> {foodItem.menuItem.name}</b> </p>
        <p> {foodItem.menuItem.description}</p>
        <p> { foodItem.preferences } </p>
      </div>
      <p> { formatter.format(foodItem.menuItem.price) } </p>
    </div>
      <div className='inline-order-modal'> </div>
    </>
  )
}
