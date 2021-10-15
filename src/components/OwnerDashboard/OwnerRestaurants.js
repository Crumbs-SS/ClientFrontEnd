import React from "react";
import {
    Button,
    ButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Typography,
} from "@material-ui/core";
import { Link } from 'react-router-dom';
import RestaurantService from '../../adapters/restaurantService';
import { useEffect, useState } from 'react';

const OwnerRestaurants = ({ username}) => {

    const [restaurants, setRestaurants] = useState([]);
    const [dummyState, setDummyState] = useState(false);

    useEffect(() => {
        RestaurantService.getOwnerRestaurants(username).then(res => {
            setRestaurants(res.data);
        })
    }, [username, dummyState])

    const deleteRestaurant = (id) => {
        RestaurantService.requestDeleteRestaurant(username, id).then(
            () => {setDummyState(true);})
    }

    const restaurantList = restaurants.map(restaurant => {
        return <TableRow key={restaurant.id}>
            <TableCell>{restaurant.name}</TableCell>
            <TableCell>{restaurant.location.street}, {restaurant.location.city}, {restaurant.location.state}, {restaurant.location.zipCode}</TableCell>
            <TableCell>{restaurant.restaurantStatus.status}</TableCell>
            <TableCell>
                <ButtonGroup size ="small" orientation="vertical">
                    <Button variant="contained" color="primary"><Link to={`/restaurants/${restaurant.id}`}>View</Link></Button>
                    <Button variant="contained"  color="default" disabled={restaurant.restaurantStatus.status === "PENDING_DELETE"}><Link to={`/owner/${username}/updateRestaurant/${restaurant.id}`}>Update</Link></Button>
                    <Button variant="contained"  color="secondary" disabled={restaurant.restaurantStatus.status === "PENDING_DELETE"} onClick={() => { if (window.confirm('Are you sure you wish to delete this restaurant?')) deleteRestaurant(restaurant.id) }}>Delete</Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    });

    return (
        <React.Fragment>

            <Typography variant="h5" color="inherit" gutterBottom>
                Your Restaurants:
            </Typography >
            <TableContainer aria-label="simple table" style={{}}>
                <Table >
                    <TableHead>
                        <TableRow  >
                            <TableCell>NAME</TableCell>
                            <TableCell>LOCATION</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurantList}
                    </TableBody>
                </Table>
            </TableContainer>


        </React.Fragment>
    )

};
export default OwnerRestaurants;
