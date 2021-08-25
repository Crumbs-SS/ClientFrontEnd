import '../../style/login-page.css';
import {useState} from 'react';
import SideBar from '../SideBar';
import LoginModal from '../modals/LoginModal';
import {clearErrors} from "../../actions/errorActions";
import {useDispatch} from "react-redux";
import ForgotPasswordModal from "../modals/ForgotPasswordModal";

const LoginPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState(null);
  const [modalForgotOpen, setModalForgotOpen] = useState(false);
  const dispatch = useDispatch();

    const openModal = (role) => {
        setModalOpen(true);
        setModalRole(role);
    }

    const openForgotModal = () => {
        closeModal();
        setModalForgotOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setModalForgotOpen(false);
        setModalRole(null);
        dispatch(clearErrors());
    }



    return (
        <>
            <SideBar/>
            <div id="login-page">
                <ForgotPasswordModal show={modalForgotOpen} onHide={closeModal} />
                <LoginModal show={modalOpen} onHide={closeModal} role={modalRole}/>
                <div className={"container"}>
                    <div className={"button"} onClick={() => openModal("customer")}>Login as Customer</div>
                    <div className={"button"}  onClick={() => openModal("driver")}>Login as Driver</div>
                    <div className={"button"}  onClick={() => openModal("owner")}>Login as Owner</div>
                </div>
                <div className={"lower"}>
                    <div className={"button"}  onClick={() => openForgotModal()}>I Forgot My Password</div>
                </div>
            </div>
    </>
  )
}

export default LoginPage;
