import { useDispatch } from 'react-redux';
import { deleteItem } from '../actions/cartActions';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const RestaurantComponent = ({ restaurant }) => {
  return(
    <div className='restaurant-sc'>
      <p className='restaurant-name-sc'>
        {restaurant.name}
      </p>
      <div className='items-quantity'>
        {
          restaurant.menuItems.map(item => <QuantityItem
            key={item.id}
            item={item}
          />
          )
        }
      </div>
    </div>
  )
}

const QuantityItem = ({ item }) => {
  const dispatch = useDispatch();

  const deleteMenuItems = item => dispatch(deleteItem(item.menuItem.id));

  return (
    <div className='quantity-item'>
      <div className='details-sc'>
        <p>{ item.quantity } x</p>

        <div className='name-description'>
          <p> {item.menuItem.name} </p>
          <p> {item.menuItem.description} </p>
          <p className='remove-sc' onClick={() => deleteMenuItems(item)}> Remove </p>
        </div>

        <p> {formatter.format(item.menuItem.price)} </p>
      </div>
    </div>
  )
}

export default RestaurantComponent;
