import {Formik} from "formik";
import {Button, Form} from "react-bootstrap";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../../actions/authActions";
import {clearErrors} from "../../actions/errorActions";

const schema = yup.object({
    email: yup.string().ensure().trim().email().required().min(5).max(50),
    firstName: yup.string().ensure().trim().required().min(1).max(50)
        .matches(/^[A-Za-z']*$/, "Name can only contain letters and apostrophes."),
    lastName: yup.string().ensure().trim().required().min(1).max(50)
        .matches(/^[A-Za-z']*$/, "Name can only contain letters and apostrophes."),
});

const ProfileUpdateForm = (props) => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.error.msg);

    const onSuccess = (values) => {
        dispatch(clearErrors());
        dispatch(updateProfile(values));
        if (!error || Object.keys(error).length < 1) {
            props.close();
        }
    };

    const showError = (error) => {
        if (!error) {
            return null;
        }
        else if (Object.keys(error).length < 1) {
            return null;
        }
        else {
            return <div style={{ color: 'red' }}>{error}</div>;
        }
    };

    return (
        <>
        {showError(error)}
        <Formik
            validationSchema={schema}
            onSubmit={onSuccess}
            initialValues={{
                username: props.user.username,
                email: props.user.email,
                firstName: props.user.firstName,
                lastName: props.user.lastName,
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

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" autoComplete="off" placeholder="Email"
                                          onChange={handleChange} value={values.email} isInvalid={errors.email}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
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

                        <Button className="button" type="submit">
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
        </>
    );
};

export default ProfileUpdateForm;