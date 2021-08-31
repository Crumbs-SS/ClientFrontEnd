import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import RestaurantComponent from '../RestaurantComponent';
import '../../style/checkout-modal.css';
import "../../style/checkoutForm.css";
import React, { useState } from "react";
import PlacesAutocomplete from 'react-places-autocomplete';

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
  const [validatedAddress, setValidatedAddress] = useState('');

  const [serverErrors, setServerErrors] = useState([]);
  const [stripeError, setStripeError] = useState(''); 

  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();


  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setStripeError(event.error ? event.error.message :  "");
  };

  const handleSubmit = async () => {
    setServerErrors([]);
    if (!validatedAddress){ setServerErrors(['Please input a valid address.']);  return}
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
      props.onSubmit({ phone, preferences, address, stripeID });
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
        { serverErrors.map((err, index) => <div key={index} className='error'>{err}</div>)}
        <Formik validationSchema={schema} initialValues={{ phone: '', address: '' }} >
          {({ errors, handleChange }) => {
            return (
              <Form noValidate>
                <b> Address </b>
                <PlacesAutocomplete value={address} onChange={onAddressFieldChanged} onSelect={onAddressSelectionClicked}>
                  {({ getInputProps, suggestions, getSuggestionItemProps}) => (
                    <div>
                      <Form.Control
                        {...getInputProps({ 
                          placeholder: 'Enter Address',
                          className: 'input-cm',
                          type: 'text',
                          name: 'address'
                        })}
                      />
                    
                    { suggestions.length > 0 && 
                      <div className='suggestions'>
                        {suggestions.map((suggestion) => {
                          return (
                            <div key={suggestion.index} className='suggestion' {...getSuggestionItemProps(suggestion)}>
                              {suggestion.description}
                            </div>
                          )
                        })}
                      </div>}
                    </div>
                  )}
                </PlacesAutocomplete>

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

      </Modal.Body>

      <Modal.Footer>
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
      </Modal.Footer>
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
