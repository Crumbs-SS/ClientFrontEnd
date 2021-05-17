//import '../style/login-page.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import LoginService from '../adapters/loginService'

const LoginForm = (props) => {
    const [form, setForm] = useState({ role: props.role });
    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
        setForm((form) => ({ ...form, [field]: value }));
        if (!!errors[field]) {
            setErrors((errors) => ({ ...errors, [field]: null }));
        }
    };

    const findFormErrors = () => {
        const { username, password, role } = form;
        const newErrors = {};
        // username errors
        if (!username || username === '') newErrors.username = 'cannot be blank';
        else if (username.length < 3) newErrors.username = 'must be at least 3 characters';
        else if (username.length > 20) newErrors.username = 'cannot be more than 20 characters';
        // password errors
        if (!password || password === '') newErrors.password = 'cannot be blank';
        else if (password.length < 6) newErrors.password = 'must be at least 6 characters';
        else if (password.length > 200) newErrors.password = 'cannot be more than 200 characters';
        // role errors
        if (!role || role === '') newErrors.role = 'cannot be blank';
        else if (role !== props.role) newErrors.role = 'incorrect role for this form';
        else if (role !== "customer" && role !== "driver" && role !== "owner") newErrors.role = 'role is invalid';
        return newErrors
    }

    const submitCredentials = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            LoginService.loginPost(form.username, form.password, form.role)
                .then(data => {
                    console.log(data.headers);
                    props.close();
                    
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    return (
        <>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={e => setField('username', e.target.value)} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setField('password', e.target.value)} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => submitCredentials(e)}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default LoginForm;
