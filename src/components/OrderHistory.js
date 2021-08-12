import '../style/order-history.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import OrderModal from './modals/OrderModal';
import UpdateModal from './modals/UpdateModal';
import CancelModal from './modals/CancelModal';
import { updateOrder, loadOrders, cancelOrder } from '../actions/orderActions';
import  Pagination  from './Pagination';
const OrderHistory = ( { orderType }) => {

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.ordersState);
  const user = useSelector(state => state.auth.user);
  const { activeOrders, inactiveOrders  } = orders;
  const shownOrders = (orderType === "active") ? 
    activeOrders.content : inactiveOrders.content;

  const [ showModal, setShowModal ] = useState(false);
  const [ showEditModal, setShowEditModal ] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [ chosenOrder, setChosenOrder ] = useState(null);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(0);
    
  const onClick = order => {
    setChosenOrder(order);
    setShowModal(true);
  }

  const onHide = () => setShowModal(false);
  const hideEditModal = () => setShowEditModal(false);
  const hideCancelModal = () => setShowCancelModal(false);

  const onEdit = () => {
    setShowModal(false);
    setShowEditModal(true);
  }

  const onUpdate = (fields) => {
    
    if(fields.foodOrders.length <= 0){
      //delete order
      dispatch(cancelOrder(chosenOrder.id, user.id));
      hideEditModal();
      return
    }

    dispatch(updateOrder(user.id, chosenOrder.id, fields, currentPage));
    hideEditModal();
    setShowModal(true);
  }

  const onSelectCancel = () => {
    setShowModal(false);
    setShowCancelModal(true);
  }
  const onCancel = () => {
    dispatch(cancelOrder(chosenOrder.id, user.id));
    hideCancelModal();
  }


  // Refresh chosenOrder for modal
  useEffect(() => {
    setTotalPages(orders[orderType+"Orders"].totalPages - 1);


    if(chosenOrder)
      setChosenOrder(shownOrders.find(order => order.id === chosenOrder.id));
  }, [orders, chosenOrder, shownOrders, orderType])


  useEffect(() => {
    dispatch(loadOrders(user.id, currentPage))
  }, [currentPage, dispatch, user])

    return (
        <>
            <div id="OrderHistoryContainer">
              {
              shownOrders.length > 0 ?
                   shownOrders.map(order => {
                    return <OrderComponent key={order.id} order={order} onClick={onClick} />
                  })
                   : "You don't have any orders"
              }
              { orders[orderType+"Orders"].totalPages > 1 ? 
                <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                : null
               }
            </div>
            <OrderModal show={showModal} onHide={onHide} order={chosenOrder} onEdit={onEdit} onSelectCancel={onSelectCancel} orderType={orderType}/>
            <UpdateModal show={showEditModal} onHide={hideEditModal} order={chosenOrder} onUpdate={onUpdate} />
            <CancelModal show={showCancelModal} onHide={hideCancelModal} order={chosenOrder} onCancel={onCancel}></CancelModal>
        </>
    );
}

export default OrderHistory;

const orderStatus = {
  "AWAITING_DRIVER": "Waiting on driver",
  "FULFILLED": "Delivered",
  "DELIVERING": "On the way"
}


const OrderComponent = ({order, onClick}) => {
  return(
    <div onClick={() => onClick(order)} className='order-component'>
      <div className='first-oc/'> 
        <p className='restaurant-name'> <b>{order.restaurant.name}</b></p>
        <p className='order-location'> { order.deliveryLocation.street } </p>
      </div>
      <p className='restaurant-name'> {orderStatus[order.orderStatus.status]}</p>
    </div>
  )
}
