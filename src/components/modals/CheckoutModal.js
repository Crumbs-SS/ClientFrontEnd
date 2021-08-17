import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import RestaurantComponent from '../RestaurantComponent';
import '../../style/checkout-modal.css';
import "../../style/checkoutForm.css";
import React, { useEffect, useState} from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import cardStyle from '../../style/cardStyle';

const CheckoutModal = props => {

  const [preferences, setPreferences] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();


  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async () => {

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
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      props.onSubmit({ phone, preferences, address })
      setSucceeded(true);
    }
  };

  

    return (
      <Modal show={props.show} onHide={() => props.onHide()} centered scrollable size="md">
        {succeeded ? <React.Fragment><p>Your payment was successful and your order has been placed!</p>
        <p>Thank you for ordering at Curmbs Food Service</p>
        <p>Go to your profile page to view your order:</p></React.Fragment> : <React.Fragment>
        <Modal.Header closeButton>
          <Modal.Title> Your Order </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik validationSchema={schema} initialValues={{ phone: '', address: '' }} >
            {({ errors, handleChange, values }) => {
              return (
                <Form noValidate>
                  <b> Address </b>
                  <Form.Control
                    type='text'
                    name='address'
                    placeholder='Enter your address'
                    className='input-cm'
                    value={address}
                    onChange={(e) => { handleChange(e); setAddress(e.target.value) }}
                    isInvalid={errors.address}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.address}
                  </Form.Control.Feedback>
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
            {error && (
              <div className="card-error" role="alert">
                {error}
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

        </Modal.Body>

        <Modal.Footer>
          <Button
            disabled={processing || disabled || succeeded}
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
        </Modal.Footer>
        </React.Fragment>
  }

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
