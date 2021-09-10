import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import OrderService from '../../adapters/orderService';
import {Button} from "@material-ui/core";
import DriverRatingForm from '../forms/DriverRatingForm';
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const OrderModal = ({ show, order, onHide, onEdit, onSelectCancel, orderType }) => {

  //900000 milliseconds = 15minutes
  const canUpdate = order ? (Date.now() - new Date(order.createdAt).getTime()) < 900000 : null
  const canCancel = order ? (Date.now() - new Date(order.createdAt).getTime()) < 300000 : null
  const cancelAt = order ? 5 - (new Date().getMinutes() - new Date(order.createdAt).getMinutes()) : null;
  const isFulfilled = orderType === 'inactive';

  const [driverRating, setDriverRating] = useState(null);
  // const [restaurantRating, setRestaurantRating] = useState(null);

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const submitRating = (rating, description) => {
    OrderService.submitRating(order.id, rating, description).then((response) => {
      setDriverRating(response.data);
    })
  }

  useEffect(() => {
    if (order !== null) {
      OrderService.getDriverRating(order.id).then((response) => {
        setDriverRating(response.data);
      })
    }
  }, [order])


  return (
    <div className='order-modal'>
      <Modal show={show} onHide={onHide} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title> Order from {order ? order.restaurant.name : null} </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p>{canCancel && !isFulfilled ? 'You have ' + cancelAt + ' minutes left to cancel your order.' : null}</p>
          <b> Delivery Location </b>
          <p> { order ? order.deliveryLocation.street + ', ' 
              + order.deliveryLocation.city + ', ' + order.deliveryLocation.state : null } </p>

          <b> Phone Number </b>
          <p> { order ? formatPhoneNumber(order.phone) : null } </p>

          <b> Order Status </b>
          <p> {order ? order.orderStatus.status.replace('_', ' ') : null} </p>
          {
            order ? order.preferences ? <> <b> Preferences </b>
              <p> {order.preferences} </p> </> : null : null
          }

          <b> Items </b>
          <br />
          <div id='restaurant-components-cm'>
            {order ? order.foodOrders.map((item) => <FoodItemComponent foodItem={item} key={item.id} />) : null}
          </div>

          {isFulfilled ?
            <>
              {/* <b> Restaurant Rating </b>*/}

              <b> Driver Rating </b>
              <p></p>
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  {driverRating === "" ? <span>Submit a rating</span> : <span>View your rating of the driver:</span>}
                </AccordionSummary>
                <AccordionDetails>
                  {driverRating === "" ? <DriverRatingForm submitRating={submitRating}></DriverRatingForm> :
                    <>
                      <div>
                        <p>Rating: {driverRating ? driverRating.rating : null}</p>
                        <p>Description: {driverRating ? driverRating.description : null}</p>
                      </div>
                    </>}
                </AccordionDetails>
              </Accordion>
            </> : null
          }
        </Modal.Body>

        <Modal.Footer>
          {
            canCancel && orderType !== isFulfilled ?
              <Button
                onClick={onSelectCancel}
                variant='contained'
                color="secondary"
                className='add-to-cart om'>
                Cancel Order
              </Button> : null
          }
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {
            canUpdate && orderType !== isFulfilled ?
              <Button
                onClick={onEdit}
                variant='contained'
                className='add-to-cart om'>
                Edit
              </Button> : null
          }
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            onClick={onHide}
            variant='contained'
            color="primary"
            className='add-to-cart om'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )

}

export default OrderModal;

const FoodItemComponent = ({ foodItem }) => {
  return (
    <>
      <div className='details-sc'>
        <div className='name-description'>
          <p className='om-name'><b> {foodItem.menuItem.name}</b> </p>
          <p> {foodItem.menuItem.description}</p>
          <p> {foodItem.preferences} </p>
        </div>
        <p> {formatter.format(foodItem.menuItem.price)} </p>
      </div>
      <div className='inline-order-modal'> </div>
    </>
  )
}

const formatPhoneNumber = number => {
  const cleaned = ('' + number).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match)
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];

  return null;
}