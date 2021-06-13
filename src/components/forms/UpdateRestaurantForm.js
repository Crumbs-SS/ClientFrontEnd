import { Formik, FieldArray, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import RestaurantService from "../../adapters/restaurantService";
import { useEffect, useState } from 'react';
import {
    Button,
    Select,
    MenuItem,
} from "@material-ui/core";



const schema = yup.object({
    name: yup.string().ensure().trim().min(1, "Cannot be blank").max(50),
    street: yup.string().ensure().trim().min(1, "Cannot be blank").max(50)
        .matches(/^[#.0-9a-zA-Z\s,-]+$/, 'Special characters are not allowed in street address'),
    city: yup.string().ensure().trim().min(1, "Cannot be blank").max(20)
        .matches(/^[a-zA-Z ]*$/, "City name can only contain letters"),
    state: yup.string().ensure().trim().min(2).max(2)
        .matches(/^[a-zA-Z ]*$/, ' State can only contain letters'),
    zip: yup.number().test(
        "maxDigits",
        "zip code must have exactly 5 digits",
        (number) => String(number).length === 5
    ),
    menu: yup.array().of(
        yup.object(
            {
                name: yup.string().required("Name required").min(1, "size 1 min"),
                price: yup.number().required("Price is required"),
                description: yup.string().required("Description is required")
            }
        )
    )
});

const UpdateRestaurantForm = (props) => {

    const [categories, setCategories] = useState([]);
    const [httpError, setHttpError] = useState([]);

    useEffect(() => {
        RestaurantService.getCategories()
            .then(({ data }) => {
                setCategories(data);
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    const onSuccess = ({ name, street, city, state, zip, categories, menu }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const body = JSON.stringify({ name, street, city, state, zip, categories, menu });
        RestaurantService.updateRestaurant(props.res.id, body, config)
            .then(res => {
                props.close();
                console.log(res);
            })
            .catch(err => {
                console.log(err.response);
                setHttpError(err.response.data);

            });
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={onSuccess}
                initialValues={{
                    name: props.res.name,
                    street: props.res.location.street,
                    city: props.res.location.city,
                    state: props.res.location.state,
                    zip: props.res.location.zipCode,
                    categories: [],
                    menu: []  = props.res.menuItems
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
                                        <div style={{color:"red"}}><p>{httpError.message}</p></div>
                                        :
                                        null
                                }
                            </div>
                            <div className="container p-3 my-3 border">
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
                                    <br/>
                                    <Select
                                        multiple
                                        value={values.categories}
                                        onChange={handleChange}
                                        name="categories"
                                        style={{minWidth:200}}
                                        >
                                        
                                        {categories.map((cat) => {

                                            return (<MenuItem key={cat.name} value={cat.name}>
                                                {cat.name}
                                            </MenuItem>)
                                        })}
                                    </Select>
                                </Form.Group>
                            </div>
                            <div className="container p-3 my-3 border">
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

                                <Form.Group controlId="formName">
                                    <Form.Label>Enter new restaurant zip code</Form.Label>
                                    <Form.Control type="text" name="zip" autoComplete="off" placeholder={values.zip}
                                        onChange={handleChange} value={values.zip} isInvalid={errors.zip} />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.zip}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <h4>Update Restaurant Menu</h4>
                            <h6>Your Menu is listed below. Modify any field to make an update.</h6>


                            <Form.Group>
                                <FieldArray name="menu">
                                    {(arrayHelpers) => (
                                        <div>
                                            {values.menu.map((menuItem, index) => {
                                                return (
                                                    <div key={menuItem.id} className="container p-3 my-3 bg-dark text-white">

                                                        <h5>Menu Item {index}:</h5>
                                                        <Form.Group>
                                                            <Form.Label>Enter new item name:</Form.Label>
                                                            <Form.Control type="text" name={`menu.${index}.name`} placeholder={menuItem.name}
                                                                onChange={handleChange} value={values.menu.name} isInvalid={errors.zip} />
                                                            {/* <Form.Control.Feedback type='invalid'>
                                                                {errors.menu.map(error => <div>{error}</div>)}
                                                            </Form.Control.Feedback> */}

                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Enter new price:</Form.Label>
                                                            <Form.Control type="text" name={`menu.${index}.price`} autoComplete="off" placeholder={menuItem.price}
                                                                onChange={handleChange} value={values.menu.price} />

                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Enter new description:</Form.Label>
                                                            <Form.Control type="text" name={`menu.${index}.description`} autoComplete="off" placeholder={menuItem.description}
                                                                onChange={handleChange} value={values.menu.descirption} />
                                                            <ErrorMessage name={`menu.${index}.description`}> {msg => <div>{msg}</div>}</ErrorMessage>

                                                        </Form.Group>
                                                        <Button variant="contained" color="secondary" onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                                                        <br />
                                                        {/* <TextField placeholder={menuItem.name} name={`menu.${index}.name`} onChange={handleChange} value={values.menu.name} isInvalid={errors.state} />
                                                        <TextField placeholder={menuItem.price} name={`menu.${index}.price`} onChange={handleChange} value={values.menu.price} isInvalid={errors.state} />
                                                        <TextField placeholder={menuItem.description} name={`menu.${index}.description`} onChange={handleChange} value={values.menu.description} fullWidth={true} isInvalid={errors.state} /> */}


                                                    </div>

                                                )
                                            })}
                                            <Button variant="contained" color="primary" onClick={() => arrayHelpers.push({
                                                name: '',
                                                price: '',
                                                description: ''
                                            })}>Add New Menu Item</Button>
                                        </div>
                                    )}

                                </FieldArray>
                            </Form.Group>

                            <Button variant="contained" type="submit" color="default">Submit</Button>
                            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                            <pre>{JSON.stringify(errors, null, 2)}</pre>
                        </Form>

                    );
                }}


            </Formik>
        </>
    )


};
export default UpdateRestaurantForm;