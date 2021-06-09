import { Formik, FieldArray } from "formik";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import RestaurantService from "../../adapters/restaurantService";
import { useEffect, useState } from 'react';

import {
    TextField,
    Button,
    Checkbox,
    Radio,
    FormControlLabel,
    Select,
    MenuItem
} from "@material-ui/core";


const schema = yup.object({
    name: yup.string().ensure().trim().max(50)
        .matches(/^[A-Za-z']*$/, "Name can only contain letters and apostrophes."),
    street: yup.string().ensure().trim().max(50)
        .matches(/^[#.0-9a-zA-Z\s,-]+$/, 'Special characters are not allowed in street address'),
    city: yup.string().ensure().trim().max(20)
        .matches(/^[a-zA-Z ]*$/, "City name can only contain letters"),
    state: yup.string().ensure().trim().min(2).max(2)
        .matches(/^[a-zA-Z ]*$/, ' State can only contain letters'),
    zip: yup.string().ensure().trim().min(5).max(5)
        .matches(/[0-9]*/, 'Zip must only consist of numbers')
});

const UpdateRestaurantForm = (props) => {

    // const [categories, setCategories] = useState(null);

    // useEffect(() => {
    //     RestaurantService.getCategories()
    //         .then(({ data }) => {
    //             setCategories(data);
    //         })
    //         .catch(() => {
    //         })

    // }, [])

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

    const onSuccess = ({ name, street, city, state, zip }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const body = JSON.stringify({ name, street, city, state, zip });
        RestaurantService.updateRestaurant(props.id, body, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={onSuccess}
                initialValues={{
                    name: '',
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    categories: [],
                    menu: [{ name: 'FWF', price: 'WE', description: 'WEF' }]
                }}>
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors
                }) => {
                    return (
                        <Form noValidate onSubmit={handleSubmit}>
                            <h3>Update Restaurant Details</h3>
                            <Form.Group controlId="formName">
                                <Form.Label>Update Restaurant Name</Form.Label>
                                <Form.Control type="text" name="name" autoComplete="off" placeholder="Enter New Restaurant Name"
                                    onChange={handleChange} value={values.name} isInvalid={errors.name} />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <h3>Update Restaurant Location</h3>
                            <Form.Group controlId="formName">
                                <Form.Label>Update Restaurant Street Address</Form.Label>
                                <Form.Control type="text" name="street" autoComplete="off" placeholder="Enter New Street Address"
                                    onChange={handleChange} value={values.street} isInvalid={errors.street} />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.street}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>Update Restaurant City</Form.Label>
                                <Form.Control type="text" name="city" autoComplete="off" placeholder="Enter New City"
                                    onChange={handleChange} value={values.city} isInvalid={errors.city} />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.city}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>Update Restaurant State</Form.Label>
                                <Form.Control type="text" name="state" autoComplete="off" placeholder="Enter New State"
                                    onChange={handleChange} value={values.state} isInvalid={errors.state} />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.state}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>Update Restaurant Zip Code</Form.Label>
                                <Form.Control type="text" name="zip" autoComplete="off" placeholder="Enter New Zip"
                                    onChange={handleChange} value={values.zip} isInvalid={errors.zip} />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.zip}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Select
                                multiple
                                value={values.categories}
                                onChange={handleChange}
                                name="categories">
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}

                            </Select>



                            <FieldArray name="menu">
                                {(arrayHelpers) => (
                                    <div>
                                        <Button onClick={() => arrayHelpers.push({
                                            name: '',
                                            price: '',
                                            description: ''
                                        })}>add menu Item</Button>

                                        {values.menu.map((menuItem, index) => {
                                            return (
                                                <div key={menuItem.id}>
                                                    <TextField placeholder="name" name={`menu.${index}.name`} onChange={handleChange} value={values.menu.name} />
                                                    <TextField placeholder="price" name={`menu.${index}.price`} onChange={handleChange} value={values.menu.price} />
                                                    <TextField placeholder="description" name={`menu.${index}.description`} onChange={handleChange} value={values.menu.description} />
                                                    <Button onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                                                </div>

                                            )
                                        })}
                                    </div>
                                )}

                            </FieldArray>



                            <Button variant="primary" type="submit">
                                Submit
                        </Button>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Form>

                    );
                }}


            </Formik>
        </>
    )


};
export default UpdateRestaurantForm;