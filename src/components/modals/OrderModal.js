import { Modal, Button } from 'react-bootstrap';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const OrderModal = ({show, order, onHide, onEdit, onSelectCancel, orderType}) => {

    //900000 milliseconds = 15minutes
    const canUpdate = order ? (Date.now() - new Date(order.createdAt).getTime()) < 900000 : null
    const canCancel = order ? (Date.now() - new Date(order.createdAt).getTime()) < 300000 : null
    const cancelAt = order ? 5 - (new Date().getMinutes() - new Date(order.createdAt).getMinutes() ): null;

  return(
    <div className='order-modal'>
      <Modal show={show} onHide={onHide} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title> Order from {order ? order.restaurant.name : null} </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p>{canCancel && orderType === "active" ? 'You have ' + cancelAt + ' minutes left to cancel your order.' : null}</p>
          <b> Delivery Location </b>
          <p> { order ? order.deliveryLocation.street + ', ' 
              + order.deliveryLocation.city + ', ' + order.deliveryLocation.state : null } </p>

          <b> Phone Number </b>
          <p> { order ? formatPhoneNumber(order.phone) : null } </p>

          <b> Order Status </b>
          <p> { order ? order.orderStatus.status.replace('_', ' ') : null } </p>
            {
              order ? order.preferences ? <> <b> Preferences </b>
                        <p> { order.preferences } </p> </> : null : null
            }

          <b> Items </b>
          <br />
          <div id='restaurant-components-cm'>
            { order ? order.foodOrders.map((item) => <FoodItemComponent foodItem={item} key={item.id} />) : null}
          </div>

        </Modal.Body>

        <Modal.Footer>
        {
            canCancel && orderType === "active" ? 
          <Button
            onClick={onSelectCancel}
            variant='danger'
            className='add-to-cart om'>
            Cancel Order
          </Button> : null
          }
          {
            canUpdate && orderType === "active"? 
          <Button
            onClick={onEdit}
            variant='secondary'
            className='add-to-cart om'>
            Edit
          </Button> : null
          }
          <Button
            onClick={onHide}
            variant='danger'
            className='add-to-cart om'>
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

const formatPhoneNumber = number => {
  const cleaned = ('' + number).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match)
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];

  return null;
}