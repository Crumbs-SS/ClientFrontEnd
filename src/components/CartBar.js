import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { checkoutCart } from '../actions/cartActions';
import RestaurantComponent from './RestaurantComponent';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import CheckoutModal from './modals/CheckoutModal';
import '../style/cart-bar.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentService from '../adapters/paymentService';

const promise = loadStripe("pk_test_51JNmSeBoRXU1dvNXVuxS9tBZUvQ7M1ljZt34Xa3LHyN3B4zVvr87mpwQXAoEYGjA8xX5ddqjRbXzv7AOI35cjXUw00NTjXVC09");

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


const CartBar = ({ active, setCartBar }) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.user);
  const isEmpty = cart.shoppingCart ? cart.shoppingCart.length <= 0 : false;
  const restaurants = {};

  const [displayModal, setDisplayModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  
  const [clientSecret, setClientSecret] = useState('');
  const token = useSelector(state => state.auth.token);
 
  const createPaymentIntent = () => {
    PaymentService.createPaymentIntent(cart.total, token)
    .then((data) => {
      setClientSecret(data.data.clientSecret);
    })
  } 

  let menuItems = [];

  if (isEmpty && displayModal)
    setDisplayModal(false);

  cart.shoppingCart.forEach((item) => {
    if (!menuItems.find(v => v.menuItem.id === item.menuItem.id)) {
      menuItems = [
        ...menuItems,
        {
          ...item,
          quantity: cart.shoppingCart.filter(v => v.menuItem.id === item.menuItem.id).length
        }
      ];
    }
  });

  menuItems.forEach((item) => {
    const restaurant = restaurants[item.menuItem.restaurant.name];

    if (restaurant) {
      const oldMenuItem = restaurant.menuItems.findIndex(v => v.menuItem.id === item.menuItem.id);
      if (oldMenuItem !== -1) {
        restaurant.menuItems[oldMenuItem].quantity = item.quantity;
      } else {
        restaurants[item.menuItem.restaurant.name] =
        {
          ...item.menuItem.restaurant,
          menuItems: [...restaurant.menuItems, item]
        }
      }

    } else {
      restaurants[item.menuItem.restaurant.name] = {
        ...item.menuItem.restaurant,
        menuItems: [item]
      }
    }
  });

  const checkout = () => {
    setCartBar(false);
    if (!isEmpty)
      setDisplayModal(true);
    createPaymentIntent();
  };

  const onHide = () => { setDisplayModal(false); return false; }

  const onSubmit = (values) => {
    if (values.phone && values.address) {
      onHide();
      dispatch(checkoutCart(user.id, cart.shoppingCart, values));
      window.alert("Your payment was successful and your order has been placed. Please check your profile page to view, update or cancel your order.");
      setRedirect('/profile');
    }
  }

  return (
    <div id='cart-bar' className={active ? 'active-cart-bar' : null}>
      <p className='title-sc'><b>Your Cart</b></p>
      {
        isEmpty ?
          <Button
            href={'/search'}
            variant='danger' className='checkout' onClick={checkout}>
            Find Restaurants
          </Button> :
          <Button variant='danger' className='checkout' onClick={checkout}>
            Checkout - {formatter.format(cart.total)}
          </Button>
      }
      {isEmpty ?
        <p className='sub-title-sc'>
          <b> Your cart is empty </b>
        </p>
        : null}
      {Object.keys(restaurants).map(restaurant => {
        const restaurantObj = restaurants[restaurant];
        return <RestaurantComponent
          key={restaurantObj.id}
          restaurant={restaurantObj}
        />
      })}
      <Elements stripe={promise}>
        <CheckoutModal
          show={displayModal}
          onHide={onHide}
          onSubmit={onSubmit}
          restaurants={restaurants}
          total={cart.total}
          clientSecret={clientSecret}
          user={user}
        />
      </Elements>
      {redirect ? <Redirect push to={redirect} /> : null}
    </div>
  )
}

export default CartBar;
