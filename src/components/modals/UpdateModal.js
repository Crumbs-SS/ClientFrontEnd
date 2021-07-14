import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import '../../style/checkout-modal.css';
import { useEffect } from 'react';



const UpdateModal = props => {

  const [ preferences, setPreferences ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ address, setAddress ] = useState('');
  const [foodOrders, setFoodOrders] = useState([]);
  const { order, onUpdate } = props;


  useEffect(() => {
    if(order){
      setPreferences(order.preferences);
      setPhone(order.phone);
      setAddress(order.deliveryLocation.street);
      setFoodOrders(order.foodOrders);
    }

  }, [order])

  const removeItem = (item) => {
    setFoodOrders(foodOrders.filter(foodOrder => foodOrder.id !== item.id));
  }

  return(
    <Modal show={props.show} onHide={() => props.onHide()} centered scrollable>
    <Modal.Header closeButton>
        <Modal.Title> Update Order </Modal.Title>
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
        { foodOrders.map((item) => <FoodItemComponent foodItem={item} key={item.id} removeItem={removeItem}/>)}
      </div>

    </Modal.Body>


    <Modal.Footer>
      <Button
        onClick={() => onUpdate({phone, preferences, address, foodOrders})}
        variant='danger'
        className='add-to-cart'
      >
        Update Order
      </Button>

    </Modal.Footer>
    </Modal>
  )
}

export default UpdateModal;

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

const FoodItemComponent = ({foodItem, removeItem}) => {
  return(
    <>
    <div className='details-sc'>
      <div className='name-description'>
        <p className='om-name'><b> {foodItem.menuItem.name}</b> </p>
        <p> {foodItem.menuItem.description}</p>
        <p> { foodItem.preferences } </p>
        <p className='remove-sc' onClick={() => removeItem(foodItem)}> Remove </p>

      </div>
      <p> { formatter.format(foodItem.menuItem.price) } </p>

    </div>
      <div className='inline-order-modal'> </div>
    </>
  )
}
