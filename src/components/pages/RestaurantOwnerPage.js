import { useEffect, useState } from 'react';
import RestaurantService from '../../adapters/restaurantService';
import React from 'react';
import { Link } from 'react-router-dom';
import UpdateRestaurantForm from '../forms/UpdateRestaurantForm';
import UpdateRestaurantModal from '../modals/UpdateRestaurantModal';
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
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState(null);


  const handleClose = () => setShow(false);
  const openModal = (body) => {
    setModalBody(body);
    setShow(true);
  };

  useEffect(() => {
    RestaurantService.getOwnerRestaurants(33).then(res => {
      setRestaurants(res.data);
    })
  })

  const deleteRestaurant = (id) => {
    RestaurantService.deleteOwnerRestaurant(id).then(() => {
      let updatedRestaurants = [...restaurants].filter(i => i.id !== id);
      setRestaurants(updatedRestaurants);
    })
  }

  const restaurantList = restaurants.map(restaurant => {
    return <TableRow key={restaurant.id}>
      <TableCell>{restaurant.name}</TableCell>
      <TableCell>{restaurant.location.street}, {restaurant.location.city}, {restaurant.location.state}, {restaurant.location.zipCode}</TableCell>
      <TableCell>
        <UpdateRestaurantModal show={show} onHide={handleClose} body={modalBody}></UpdateRestaurantModal>
        <ButtonGroup>
          <Button size="small" color="primary" ><Link to={`/restaurants/${restaurant.id}`}>View</Link></Button>
          <Button size="small" color="primary" onClick={() => openModal(<UpdateRestaurantForm res={restaurant} close={handleClose}></UpdateRestaurantForm>)}>Edit</Button>
          <Button size="small" color="secondary" onClick={() => { if (window.confirm('Are you sure you wish to delete this restaurant?')) deleteRestaurant(restaurant.id) }}>Delete</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  });


  return (
    <>
      <div className="container p-3 my-3 border" style={{width:800+'em'}}>
        <div style={{ marginRight: 18 + 'em', padding: 10 + 'px' }} >
          <h1>Welcome to your dashboard</h1>
          <h2>You have: {restaurants.length} restaurants</h2>
          <Button variant="contained">Profile</Button>
          <Button variant="contained">Add Restaurant</Button>
        </div>
        <div>
          <TableContainer aria-label="simple table" style={{ maxWidth: 900, border: '1px solid black' }}>
            <Table >
              <TableHead>
                <TableRow  >
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
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