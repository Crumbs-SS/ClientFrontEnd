import '../../style/login-page.css';
import {useState} from 'react';
import SideBar from '../SideBar';
import LoginModal from '../modals/LoginModal';
import {clearErrors} from "../../actions/errorActions";
import {useDispatch} from "react-redux";

const LoginPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState(null);
  const dispatch = useDispatch();

    const openModal = (role) => {
        setModalOpen(true);
        setModalRole(role);
    }
    const closeModal = () => {
        setModalOpen(false);
        setModalRole(null);
        dispatch(clearErrors());
    }


    return (
        <>
            <SideBar/>
            <div id="login-page">
                <LoginModal show={modalOpen} onHide={closeModal} role={modalRole}/>
                <div className={"container row align-items-center vertical-center"}>

                    <div className={"button"} onClick={() => openModal("customer")}>Login as Customer</div>
                    <div className={"button"}  onClick={() => openModal("driver")}>Login as Driver</div>
                    <div className={"button"}  onClick={() => openModal("owner")}>Login as Owner</div>

                </div>
            </div>
    </>
  )
}

export default LoginPage;
