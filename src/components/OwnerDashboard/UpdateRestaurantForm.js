import { Formik, FieldArray, ErrorMessage, Field } from "formik";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import RestaurantService from "../../adapters/restaurantService";
import {Redirect} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Button,
    Select,
    MenuItem,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead
} from "@material-ui/core";
import React from "react";
import '../../style/updateRestaurant.css';


const schema = yup.object({
    name: yup.string().ensure().trim().min(1, "Cannot be blank").max(50),
    street: yup.string().ensure().trim().min(1, "Cannot be blank").max(50)
        .matches(/^[#.0-9a-zA-Z\s,-]+$/, 'Special characters are not allowed in street address'),
    city: yup.string().ensure().trim().min(1, "Cannot be blank").max(20)
        .matches(/^[a-zA-Z ]*$/, "City name can only contain letters"),
    state: yup.string().ensure().trim().min(2).max(2)
        .matches(/^[a-zA-Z ]*$/, ' State can only contain letters'),
    zip: yup.number("Must be a number").test(
        "maxDigits",
        "zip code must have exactly 5 digits",
        (number) => String(number).length === 5
    ),
    menu: yup.array().of(
        yup.object(
            {
                name: yup.string().required("Name required").min(1, "Cannot be blank"),
                price: yup.number("Must be a number").required("Price is required"),
                description: yup.string().required("Description is required")
            }
        )
    )
});

const UpdateRestaurantForm = () => {

    const [restaurant, setRestaurant] = useState(null);
    const [categories, setCategories] = useState([]);
    const [httpError, setHttpError] = useState([]);
    const [redirectUser, setRedirect] = useState(false);
    const username = window.location.pathname.split('/owner/')[1].split('/updateRestaurant')[0];
    const id = window.location.pathname.split('/updateRestaurant/')[1];
        


    useEffect(() => {

        RestaurantService.findRestaurant(id)
            .then(({ data }) => {
                setRestaurant(data);
            })
            .catch((error) => {
                console.log(error)
            }, [])

        RestaurantService.getCategories()
            .then(({ data }) => {
                setCategories(data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])


    const onSuccess = ({ name, street, city, state, zip, categories, menu }) => {
       
        
        RestaurantService.updateRestaurant(username, id, { name, street, city, state, categories, menu })
            .then(res => {
                setRedirect(true);
            })
            .catch(err => {
                setHttpError(err.response);
            });
    }

    if (restaurant) {
        return (
            <>
                <h1 className="title">Update your restaurant: {restaurant.name} </h1>
                <br />

                <Formik
                    validationSchema={schema}
                    validateOnChange={true}
                    onSubmit={onSuccess}
                    initialValues={{
                        name: restaurant.name,
                        street: restaurant.location.street,
                        city: restaurant.location.city,
                        state: restaurant.location.state,
                        categories: [],
                        menu: restaurant.menuItems
                    }}>
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors
                    }) => {
                        return (


                            <Form noValidate onSubmit={handleSubmit}>
                                <div>
                                    {
                                        httpError ?
                                            <div style={{ color: "red" }}><p>{httpError.message}</p></div>
                                            :
                                            null
                                    }
                                </div>
                                <Container maxWidth="md" >
                                    <h4>Update Restaurant Details</h4>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Enter new restaurant name:</Form.Label>
                                        <Form.Control type="text" name="name" autoComplete="off" placeholder={values.name}
                                            onChange={handleChange} value={values.name} isInvalid={errors.name} />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>

                                        <Form.Label>Choose new restaurant categories: </Form.Label>
                                        <br />
                                        <Select
                                            multiple
                                            value={values.categories}
                                            onChange={handleChange}
                                            name="categories"
                                            style={{ minWidth: 200 }}
                                        >

                                            {categories.map((cat) => {

                                                return (<MenuItem key={cat.name} value={cat.name}>
                                                    {cat.name}
                                                </MenuItem>)
                                            })}
                                        </Select>
                                    </Form.Group>

                                    <h4>Update Restaurant Location</h4>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Enter new restaurant Street address:</Form.Label>
                                        <Form.Control type="text" name="street" autoComplete="off" placeholder={values.street}
                                            onChange={handleChange} value={values.street} isInvalid={errors.street} />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.street}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formName">
                                        <Form.Label>Enter new restaurant city:</Form.Label>
                                        <Form.Control type="text" name="city" autoComplete="off" placeholder={values.city}
                                            onChange={handleChange} value={values.city} isInvalid={errors.city} />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.city}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="formName">
                                        <Form.Label>Enter new restaurant state:</Form.Label>
                                        <Form.Control type="text" name="state" autoComplete="off" placeholder={values.state}
                                            onChange={handleChange} value={values.state} isInvalid={errors.state} />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.state}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <h4>Update Restaurant Menu</h4>
                                    <h6>Your Menu is listed below. Modify any field to make an update.</h6><br/>

                                    <FieldArray name="menu">
                                        {arrayHelpers => (
                                            <div>
                                                <Button variant="contained" color="primary" onClick={() => arrayHelpers.push({
                                                    name: '',
                                                    price: '',
                                                    description: ''
                                                })}>Add New Menu Item</Button>
                                                <br/><br/>
                                                <TableContainer aria-label="simple table" style={{ maxWidth: 1100 , border: "3px solid black" }}>
                                                    <Table >
                                                        <TableHead>
                                                            <TableRow  >
                                                                <TableCell style={{fontWeight: 2000}}>Item Name</TableCell>
                                                                <TableCell>Price</TableCell>
                                                                <TableCell>Description</TableCell>
                                                                <TableCell>Action</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {values.menu.map((menuItem, index) => (
                                                                <TableRow key={index} >
                                                                    <TableCell style={{width:'10%'}}><Field placeholder={menuItem.name} name={`menu.${index}.name`} /><br />
                                                                    <ErrorMessage name={`menu.${index}.name`} /></TableCell>
                                                                    <TableCell style={{width:'10%'}}><Field placeholder={menuItem.price} name={`menu.${index}.price`}></Field><br/>
                                                                    <ErrorMessage name={`menu.${index}.price`} class="error" /></TableCell>
                                                                    <TableCell><Field placeholder={menuItem.description} name={`menu.${index}.description`} style={{width:'100%'}}/><br />
                                                                    <ErrorMessage name={`menu.${index}.description`} /></TableCell>
                                                                    <TableCell style={{width:'15%'}}><Button variant="contained" color="secondary" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) arrayHelpers.remove(index)}}>Delete</Button></TableCell>
                                                                </TableRow>
                                                            ))}

                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </div>
                                        )}
                                    </FieldArray>
                                    <br/><br/>
                                    <Button variant="contained" type="submit" color="primary">Submit</Button>
                                    <br/><br/>
                                </Container>
                                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                            </Form>
                        );
                    }}
                </Formik>
                { redirectUser ? <Redirect push to={`/owner/${username}/dashboard`} /> : null }
            </>
        )
    }
    else {
        return (
            null
        )
    }


};
export default UpdateRestaurantForm;