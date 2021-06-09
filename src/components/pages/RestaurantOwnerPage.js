import { useEffect, useState } from 'react';
import RestaurantService from '../../adapters/restaurantService';
import { Button, ButtonGroup,Table } from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import UpdateRestaurantForm from '../forms/UpdateRestaurantForm';
import UpdateRestaurantModal from '../modals/UpdateRestaurantModal';

const RestaurantOwnerPage = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState(null);

  const handleClose = () => setShow(false);
  const openModal = (body) => {
    setShow(true);
    setModalBody(body)
  };

  useEffect(() => {
    RestaurantService.getOwnerRestaurants(168).then(res => {
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
    return <tr key={restaurant.id}>
      <td>{restaurant.name}</td>
      <td>{restaurant.location.street}, {restaurant.location.city}, {restaurant.location.state}, {restaurant.location.zipCode}</td>
      <td>
        <UpdateRestaurantModal show={show} onHide={handleClose} body= {modalBody}></UpdateRestaurantModal>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"restaurantOwner/" + restaurant.id}>View</Button>
          <Button size="sm" color="primary" onClick={() => openModal(<UpdateRestaurantForm id={restaurant.id} close={handleClose}></UpdateRestaurantForm>)}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this restaurant?')) deleteRestaurant(restaurant.id) }}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <>
      <div>
        <div>
          <h1>Welcome to your dashboard</h1>
          <h2>You have: {restaurants.length} restaurants</h2>
        </div>
        <div>

          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurantList}
            </tbody>
          </Table>

        </div>
      </div>
    </>
  )


}
export default RestaurantOwnerPage;