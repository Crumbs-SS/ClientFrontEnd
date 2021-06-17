import '../style/order-history.css';
import {Row, Col} from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import OrderModal from './modals/OrderModal';

const OrderHistory = () => {

  const orders = useSelector((state) => state.ordersState);
  const activeOrders = orders.activeOrders;

  const [showModal, setShowModal] = useState(false);
  const [ chosenOrder, setChosenOrder ] = useState(null);

  const onClick = order => {
    setChosenOrder(order);
    setShowModal(true);
  }

  const onHide = () => setShowModal(false);

    return (
        <>
            <div id="OrderHistoryContainer">
                <Row className="container-title justify-content-center">Pending Orders</Row>
                <Col className="justify-content-center"> {activeOrders.length > 0 ?
                   activeOrders.map((order, i) => {
                    return <OrderComponent key={order.id} order={order} onClick={onClick} />
                  })
                   : "You don't have any orders"
                } </Col>
            </div>
            <OrderModal show={showModal} onHide={onHide} order={chosenOrder} />
        </>
    );
}

export default OrderHistory;


const OrderComponent = ({order, onClick}) => {
  return(
    <div className='order-component'>
      <p onClick={() => onClick(order)} className='restaurant-name'> <b>{order.restaurant.name}</b></p>
      <p className='order-location'> { order.address } </p>
      <p className='order-location'> { order.preferences } </p>
    </div>
  )
}
