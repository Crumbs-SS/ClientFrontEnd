import '../../style/delete-form.css'
import '../../style/forms.css';
import {useState} from "react";
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {deleteAccount} from "../../actions/authActions";
import {Button, Form} from "react-bootstrap";
import {clearErrors} from "../../actions/errorActions";

const schema = yup.object({
    password: yup.string().ensure().trim().required().min(6).max(200),
});

const AccountDeleteForm = (props) => {
    const [warningAccepted, setWarningAccepted] = useState(false);
    const error = useSelector(state => state.error.msg);
    const dispatch = useDispatch();

    const onSuccess = (values) => {
        dispatch(clearErrors());
        dispatch(deleteAccount(props.username, values.password));
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

    if (!warningAccepted) {
        return (
            <>
                Are you sure you want to delete your account?
                <br/>
                You will lose your order history and all reward points.
                <br/>
                This Cannot be undone.
                <br/>
                <div className="delete-form-button button"
                     onClick={() => setWarningAccepted(true)}>
                    Continue
                </div>
            </>
        );
    }
    else {
        return (
            <>
                {showError(error)}
                <Formik
                    validationSchema={schema}
                    onSubmit={onSuccess}
                    initialValues={{
                        password: '',
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
                                    <Form.Label>Enter your password to confirm.</Form.Label>
                                    <Form.Control type="password" name="password" autoComplete="off" placeholder="Password"
                                                  onChange={handleChange} value={values.password} isInvalid={errors.password}/>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.password}
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
    }
};

export default AccountDeleteForm;