import {useDispatch, useSelector} from "react-redux";
import {logout, registerOwner} from "../../actions/authActions";
import {Formik} from "formik";
import {Button, Form} from "react-bootstrap";
import * as yup from "yup";
import {useEffect} from "react";

const schema = yup.object({
    username: yup.string().ensure().trim().required().min(3).max(20)
        .matches(/^[A-Za-z0-9]*$/, "Username can only contain letters and numbers."),
    password: yup.string().ensure().trim().required().min(6).max(200),
    passwordVerify: yup.string().oneOf([yup.ref('password'), null], "Passwords must match."),
    email: yup.string().ensure().trim().email().required().min(5).max(50),
    emailVerify: yup.string().oneOf([yup.ref('email'), null], "Emails must match."),
    firstName: yup.string().ensure().trim().required().min(1).max(50)
        .matches(/^[A-Za-z']*$/, "Name can only contain letters and apostrophes."),
    lastName: yup.string().ensure().trim().required().min(1).max(50)
        .matches(/^[A-Za-z']*$/, "Name can only contain letters and apostrophes."),
    phone: yup.string().ensure().trim().required().min(7).max(15)
        .matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
            "Phone number must be valid."),
});

const OwnerRegistrationForm = (props) => {
    const dispatch = useDispatch();
    const goodResponse = useSelector(state => state.auth.id)
    const onSuccess = (values) => {
        dispatch(registerOwner(values));
    };

    useEffect(() => {
        if (null !== goodResponse) {
            dispatch(logout());
            props.close();
        }
    }, [goodResponse, dispatch, props]);

    return (
        <Formik
            validationSchema={schema}
            onSubmit={onSuccess}
            initialValues={{
                username: '',
                password: '',
                passwordVerify: '',
                email: '',
                emailVerify: '',
                firstName: '',
                lastName: '',
                phone: '',
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
              }) => {
                return (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" autoComplete="off" placeholder="Enter Username"
                                          onChange={handleChange} value={values.username} isInvalid={errors.username}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" autoComplete="off" placeholder="Password"
                                          onChange={handleChange} value={values.password} isInvalid={errors.password}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPasswordVerify">
                            <Form.Label>Verify Password</Form.Label>
                            <Form.Control type="password" name="passwordVerify" autoComplete="off"
                                          placeholder="Password"
                                          onChange={handleChange} value={values.passwordVerify}
                                          isInvalid={errors.passwordVerify}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.passwordVerify}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" autoComplete="off" placeholder="Email"
                                          onChange={handleChange} value={values.email} isInvalid={errors.email}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEmailVerify">
                            <Form.Label>Verify Email</Form.Label>
                            <Form.Control type="text" name="emailVerify" autoComplete="off" placeholder="Email"
                                          onChange={handleChange} value={values.emailVerify}
                                          isInvalid={errors.emailVerify}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.emailVerify}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" autoComplete="off" placeholder="Enter First Name"
                                          onChange={handleChange} value={values.firstName}
                                          isInvalid={errors.firstName}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" autoComplete="off" placeholder="Enter Last Name"
                                          onChange={handleChange} value={values.lastName} isInvalid={errors.lastName}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" name="phone" autoComplete="off" placeholder="Enter Phone Number"
                                          onChange={handleChange} value={values.phone} isInvalid={errors.phone}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default OwnerRegistrationForm;
