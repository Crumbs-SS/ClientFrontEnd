import { useEffect, useState } from 'react';
import RestaurantService from '../../adapters/restaurantService';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import {useSelector} from 'react-redux';
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead
} from "@material-ui/core";

const RestaurantOwnerPage = () => {

  const [restaurants, setRestaurants] = useState([]);
  const username = window.location.pathname.split('/owner/')[1].split('/dashboard')[0];
  const token = useSelector(state => state.auth.token);
 
  useEffect(() => {
    RestaurantService.getOwnerRestaurants(username, token).then(res => {
      setRestaurants(res.data);
    })
  },[username, token])

  const deleteRestaurant = (id) => {
    RestaurantService.requestDeleteRestaurant(username, id, token).then(() => {username = username})
  }

  const restaurantList = restaurants.map(restaurant => {
    return <TableRow key={restaurant.id}>
      <TableCell>{restaurant.name}</TableCell>
      <TableCell>{restaurant.location.street}, {restaurant.location.city}, {restaurant.location.state}, {restaurant.location.zipCode}</TableCell>
      <TableCell>{restaurant.restaurantStatus.status}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button size="small" color="primary" ><Link to={`/restaurants/${restaurant.id}`}>View</Link></Button>
          <Button size="small" color="primary" disabled={restaurant.restaurantStatus.status === "PENDING_DELETE"}><Link to={`/owner/${username}/updateRestaurant/${restaurant.id}`}>Update</Link></Button>
          <Button size="small" color="secondary" disabled={restaurant.restaurantStatus.status === "PENDING_DELETE"} onClick={() => { if (window.confirm('Are you sure you wish to delete this restaurant?')) deleteRestaurant(restaurant.id) }}>Delete</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  });

  return (
    <>
    <Header />
      <div className="container p-3 my-3 ">
        <div>
          <h1>Welcome to your dashboard</h1>
          <h2>You have: {restaurants.length} restaurants</h2>
          
        </div>
        <div>
          <TableContainer aria-label="simple table" style={{ maxWidth: 900, border: '1px solid black' }}>
            <Table >
              <TableHead>
                <TableRow  >
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurantList}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      
    </>
  )


}
export default RestaurantOwnerPage;