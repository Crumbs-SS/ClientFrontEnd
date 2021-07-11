import '../style/order-history.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import OrderModal from './modals/OrderModal';
import UpdateModal from './modals/UpdateModal';
import { updateOrder, loadOrders } from '../actions/orderActions';
import  Pagination  from './Pagination';
const OrderHistory = () => {

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.ordersState);
  const user = useSelector(state => state.auth.user);
  const { activeOrders: { content: activeOrders } } = orders;

  const [ showModal, setShowModal ] = useState(false);
  const [ showEditModal, setShowEditModal ] = useState(false);
  const [ chosenOrder, setChosenOrder ] = useState(null);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(0);
    
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
    
    if(fields.foodOrders.length > 0){
      // Delete the order
    }

    dispatch(updateOrder(user.id, chosenOrder.id, fields));
    hideEditModal();
    setShowModal(true);
  }


  // Refresh chosenOrder for modal
  useEffect(() => {
    setTotalPages(orders.activeOrders.totalPages - 1);

    if(chosenOrder)
      setChosenOrder(activeOrders.find(order => order.id === chosenOrder.id));
  }, [orders, chosenOrder, activeOrders])


  useEffect(() => {
    dispatch(loadOrders(user.id, currentPage))
  }, [currentPage])

    return (
        <>
            <div id="OrderHistoryContainer">
              {
              activeOrders.length > 0 ?
                   activeOrders.map(order => {
                    return <OrderComponent key={order.id} order={order} onClick={onClick} />
                  })
                   : "You don't have any orders"
              }
              { orders.activeOrders.totalPages > 1 ? 
                <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                :
                null
               }
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
