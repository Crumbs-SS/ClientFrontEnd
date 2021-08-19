import '../../style/forms.css';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import {clearLoginStatus, login} from '../../actions/authActions'
import {clearErrors} from "../../actions/errorActions";
import {useEffect} from "react";

const schema = yup.object({
    username: yup.string().ensure().trim().required().min(3).max(20),
    password: yup.string().ensure().trim().required().min(6).max(200),
    role: yup.string().ensure().trim().required().matches(/(customer|driver|owner)/),
});

const LoginForm = (props) => {

    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loginSuccess);
    const error = useSelector(state => state.error.msg);
    const onSuccess = (values) => {
        dispatch(clearErrors());
        dispatch(login(values));
    };

    useEffect(() => {
        if (loggedIn) {
            dispatch(clearLoginStatus());
            props.close();
        }
    }, [loggedIn, props, dispatch])

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
                username: '',
                password: '',
                role: props.role,
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                );
            }}
        </Formik>
        </>
    );
}

export default LoginForm;
