//import '../style/login-page.css';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import {login} from '../actions/authActions'

const schema = yup.object({
    username: yup.string().ensure().trim().required().min(3).max(20),
    password: yup.string().ensure().trim().required().min(6).max(200),
    role: yup.string().ensure().trim().required().matches(/(customer|driver|owner)/),
});

const LoginForm = (props) => {

    const dispatch = useDispatch();

    const onSuccess = (values) => {
        dispatch(login(values));
        props.close();
    };

    return (
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
    );
}

export default LoginForm;
