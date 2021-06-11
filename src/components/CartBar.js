import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import RestaurantComponent from './RestaurantComponent';
import '../style/cart-bar.css';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


const CartBar = ({ active }) => {

  const cart = useSelector(state => state.cart);
  const isEmpty = cart.shoppingCart ? cart.shoppingCart.length<=0 : false;
  const restaurants = {};

  let menuItems = [];

  cart.shoppingCart.forEach((item) => {
    if(!menuItems.find(v => v.id === item.id)){
      menuItems = [
        ...menuItems,
        {...item,
          quantity: cart.shoppingCart.filter(v => v.id === item.id).length}
      ];
    }
  });

  menuItems.forEach((item) => {
    const restaurant = restaurants[item.restaurant.name];

    if(restaurant){
      const oldMenuItem = restaurant.menuItems.findIndex(v => v.id === item.id);
      if(oldMenuItem !== -1){
        restaurant.menuItems[oldMenuItem].quantity = item.quantity;
      } else{
        restaurants[item.restaurant.name] =
          {...item.restaurant,
            menuItems: [...restaurant.menuItems, item]}
      }

    } else{
      restaurants[item.restaurant.name] = {
        ...item.restaurant,
         menuItems: [item]
      }
    }
  });

  return(
    <div id='cart-bar' className={active ? 'active-cart-bar' : null}>
      <p className='title-sc'><b>Your Cart</b></p>
      <Button variant='danger' className='checkout'>
        { isEmpty ?
          `Find Restaurants` :
          `Checkout - ${ formatter.format(cart.total)}` }
      </Button>
      { isEmpty ?
        <p className='sub-title-sc'>
          <b> Your cart is empty </b>
        </p>
        : null }
      { Object.keys(restaurants).map(restaurant =>{
        const restaurantObj = restaurants[restaurant];
        return <RestaurantComponent
                  key={restaurantObj.id}
                  restaurant={restaurantObj}
                 />
        })}

    </div>
  )
}

export default CartBar;
