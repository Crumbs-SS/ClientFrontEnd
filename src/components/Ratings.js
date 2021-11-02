import React from 'react';
import { useState, useEffect } from 'react';
import OrderService from '../adapters/orderService';
import RatingForm from './forms/RatingForm';

const Ratings = ({orderId}) => {

    const [driverRating, setDriverRating] = useState(null);
    const [restaurantRating, setRestaurantRating] = useState(null);
    
    useEffect(() => {
        OrderService.getDriverRating(orderId).then((response) => {
          setDriverRating(response.data);
        })
        OrderService.getRestaurantRating(orderId).then((response) => {
            setRestaurantRating(response.data);
        })
    }, [orderId])
  
    const submitDriverRating = (score, description) => {
      OrderService.submitDriverRating(orderId, score, description).then((response) => {
        setDriverRating(response.data);
      })
    }
    const submitRestaurantRating = (score, description) => {
        OrderService.submitRestaurantRating(orderId, score, description).then((response) => {
          setRestaurantRating(response.data);
        })
    }

    return (
        <>
        <b> Restaurant Rating </b>
        <p></p>
        <RatingForm rating={restaurantRating}  submitRating={submitRestaurantRating}/>
        <b> Driver Rating </b>
        <p></p>
        <RatingForm rating={driverRating} submitRating={submitDriverRating}/>
        </>
    );

}
export default Ratings;
