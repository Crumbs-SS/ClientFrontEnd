

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
            menuItem={item}
          />
          )
        }
      </div>
    </div>
  )
}

const QuantityItem = ({ menuItem }) => {
  return (
    <div className='quantity-item'>
      <div className='details-sc'>
        <p>{ menuItem.quantity } x</p>

        <div className='name-description'>
          <p> {menuItem.name} </p>
          <p> {menuItem.description} </p>
          <p className='remove-sc'> Remove </p>
        </div>

        <p> {formatter.format(menuItem.price)} </p>
      </div>
    </div>
  )
}

export default RestaurantComponent;
