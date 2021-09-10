import '../../style/forms.css';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button, Form} from 'react-bootstrap';
import AccountService from "../../adapters/accountService";

const schema = yup.object({
    email: yup.string().ensure().trim().email().required().min(5).max(50)
});

const ForgotPasswordForm = (props) => {
    const onSuccess = (values) => {
        AccountService.forgotPassword(values.email).then();
        props.close();
        window.alert('Please check your email inbox for a recovery email.');
    };

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={onSuccess}
                initialValues={{
                    email: '',
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

export default ForgotPasswordForm;
