import '../style/order-history.css';
import {Row, Col} from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import OrderModal from './modals/OrderModal';
import UpdateModal from './modals/UpdateModal';
import { updateOrder } from '../actions/orderActions';

const OrderHistory = () => {

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.ordersState);
  const user = useSelector(state => state.auth.user);
  const activeOrders = orders.activeOrders;

  const [ showModal, setShowModal ] = useState(false);
  const [ showEditModal, setShowEditModal ] = useState(false);
  const [ chosenOrder, setChosenOrder ] = useState(null);
    
  const onClick = order => {
    setChosenOrder(order);
    setShowModal(true);
  }

  const onHide = () => setShowModal(false);
  const hideEditModal = () => setShowEditModal(false);

  const onEdit = () => {
    setShowModal(false);
    setShowEditModal(true);
  }

  const onUpdate = (fields) => {
      dispatch(updateOrder(user.id, chosenOrder.id, fields));
      hideEditModal();
      setShowModal(true);

      if(fields.foodOrders.length > 0){
        // Delete the order
      }
  }

  // Refresh chosenOrder for moda
  useEffect(() => {
    if(chosenOrder)
      setChosenOrder(orders.activeOrders.find(order => order.id === chosenOrder.id));
  }, [orders, chosenOrder])

    return (
        <>
            <div id="OrderHistoryContainer">

            </div>
            <OrderModal show={showModal} onHide={onHide} order={chosenOrder} onEdit={onEdit} />
            <UpdateModal show={showEditModal} onHide={hideEditModal} order={chosenOrder} onUpdate={onUpdate} />
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
