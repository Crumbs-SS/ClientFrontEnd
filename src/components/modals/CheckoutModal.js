import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import RestaurantComponent from '../RestaurantComponent';
import '../../style/checkout-modal.css';
import "../../style/checkoutForm.css";
import React, { useState } from "react";
import PlacesAutocompleteForm from '../forms/PlacesAutocompleteForm';
import { Redirect } from 'react-router-dom';

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import cardStyle from '../../style/cardStyle';
import { useDispatch } from 'react-redux';
import { checkoutCart } from '../../actions/cartActions';

const CheckoutModal = props => {

  const [preferences, setPreferences] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [validatedAddress, setValidatedAddress] = useState('');

  const [serverErrors, setServerErrors] = useState([]);
  const [stripeError, setStripeError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();


  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setStripeError(event.error ? event.error.message : "");
  };

  const handleSubmit = async () => {
    setServerErrors([]);
    if (!validatedAddress) { setServerErrors(['Please input a valid address.']); return }
    if (stripeError) return;

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(props.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: props.user.email,
          name: props.user.firstName + props.user.lastName,
        }
      }
    });
    if (payload.error) {
      setServerErrors([...serverErrors, `Payment failed: ${payload.error.message}`]);
      setProcessing(false);
    } else {
      setServerErrors([]);
      setProcessing(false);
      const stripeID = payload.paymentIntent.id;
      if (phone && address) {
        dispatch(checkoutCart(props.cart.shoppingCart, { phone, preferences, address, stripeID }));
        setSuccess(true);
        // window.alert("Your payment was successful and your order has been placed. Please check your profile page to view, update or cancel your order.");
        // setRedirect('/profile');
      }
    }
  };

  const onAddressSelectionClicked = (suggestionDescription) => {
    setAddress(suggestionDescription);
    setValidatedAddress(suggestionDescription);
  }

  const onAddressFieldChanged = (inputText) => {
    setValidatedAddress('');
    setAddress(inputText);
  }


  return (
    <Modal show={props.show} onHide={() => props.onHide()} centered scrollable size="md">
      
      <Modal.Header closeButton>
        <Modal.Title> Your Order </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {success ? 
          <><h4>Your payment was processed and your order has been placed.</h4> <br />
          <h4>Go to your profile page to view updates on your order.</h4> <br />
          <h4>Thank you for ordering with Crumbs Food Service!</h4> </> : 
          <>
          {serverErrors.map((err, index) => <div key={index} className='error'>{err}</div>)}
          <Formik validationSchema={schema} initialValues={{ phone: '', address: '' }} >
            {({ errors, handleChange }) => {
              return (
                <Form noValidate>
                  <b> Address </b>
                  <PlacesAutocompleteForm
                    onAddressFieldChanged={onAddressFieldChanged}
                    onAddressSelectionClicked={onAddressSelectionClicked}
                    address={address}
                  />
                  <br />
                  <b> Phone Number </b>
                  <Form.Control
                    type='text'
                    name='phone'
                    placeholder='Enter your phone number'
                    className='input-cm'
                    value={phone}
                    onChange={(e) => { handleChange(e); setPhone(e.target.value) }}
                    isInvalid={errors.phone}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form>
              )
            }
            }
          </Formik>

          { /* Payment Options Here */}
          <br />
          <div >
            <b> Payment Inforatiom </b>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            {/* Show any error that happens when processing the payment */}
            {stripeError && (
              <div className="card-error error" role="alert" >
                {stripeError}
              </div>
            )}
          </div>
          <br />

          <div className='preferences'>
            <div className='extra-instructions'>
              <b> Extra instructions </b>
              <span> List any special requests </span>
            </div>
            <textarea
              onChange={e => setPreferences(e.target.value)}
              value={preferences}
              className='preferences-textbox'
            />
          </div>

          <br />
          <b> Items Ordered </b>

          <div id='restaurant-components-cm'>
            {Object.keys(props.restaurants).map(restaurant => {
              const restaurantObj = props.restaurants[restaurant];
              return <RestaurantComponent
                key={restaurantObj.id}
                restaurant={restaurantObj}
              />
            })}
          </div>
        </>
        }
      </Modal.Body>

      <Modal.Footer>
        {success ? <Button variant="danger" onClick={() => { props.onHide(); setRedirect('/profile') }}>Close</Button> :
          <Button
            disabled={processing || disabled}
            onClick={() => handleSubmit()}
            className='payButton'
          >
            <span >
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now   "
              )}
            </span>
            {formatter.format(props.total)}
          </Button>
        }
      </Modal.Footer>
      {redirect ? <Redirect push to={redirect} /> : null}
    </Modal>

  );

}

export default CheckoutModal;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


const schema = yup.object({
  address: yup.string().ensure().trim().required().max(30),
  phone: yup.string().ensure().trim().required().min(7).max(15)
    .matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      "Phone number must be valid.")
})
