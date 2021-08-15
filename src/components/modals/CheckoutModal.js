import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import RestaurantComponent from '../RestaurantComponent';
import '../../style/checkout-modal.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";
import "../../style/checkoutForm.css";


const promise = loadStripe("pk_test_51JNmSeBoRXU1dvNXVuxS9tBZUvQ7M1ljZt34Xa3LHyN3B4zVvr87mpwQXAoEYGjA8xX5ddqjRbXzv7AOI35cjXUw00NTjXVC09");

const CheckoutModal = props => {

  const [ preferences, setPreferences ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ address, setAddress ] = useState('');

  return(
    <Modal show={props.show} onHide={() => props.onHide()} centered scrollable size="md">
    <Modal.Header closeButton>
        <Modal.Title> Your Order </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Formik validationSchema={schema} initialValues={{phone: '', address: ''}} >
      {({errors, handleChange, values}) => {
          return (
            <Form noValidate>
              <b> Address </b>
              <Form.Control
                type='text'
                name='address'
                placeholder='Enter your address'
                className='input-cm'
                value={address}
                onChange={(e) => {handleChange(e); setAddress(e.target.value)}}
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
                  onChange={(e) => {handleChange(e); setPhone(e.target.value)}}
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

      { /* Payment Options Here */ }
      <br />
      <div >
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
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
        { Object.keys(props.restaurants).map(restaurant =>{
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
        onClick={() => props.onSubmit({phone, preferences, address})}
        variant='danger'
        className='add-to-cart'
      >
        Checkout - {formatter.format(props.total)}
      </Button>

    </Modal.Footer>
    </Modal>
  )
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
