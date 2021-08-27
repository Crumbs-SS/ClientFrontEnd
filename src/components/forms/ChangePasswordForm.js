import '../../style/forms.css';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import {changePassword} from '../../actions/authActions'
import {clearErrors} from "../../actions/errorActions";

const schema = yup.object({
    password: yup.string().ensure().trim().required().min(6).max(200),
    passwordVerify: yup.string().oneOf([yup.ref('password'), null], "Passwords must match.")
});

const ChangePasswordForm = (props) => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.error.msg);

    const onSuccess = (values) => {
        dispatch(clearErrors());
        dispatch(changePassword(values.password, props.token));
        if (!error || Object.keys(error).length < 1) {
            props.success(true);
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
                    password: '',
                    passwordVerify: '',
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
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" autoComplete="off" placeholder="Password"
                                              onChange={handleChange}
                                              value={values.password} isInvalid={errors.password}/>
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

export default ChangePasswordForm;
