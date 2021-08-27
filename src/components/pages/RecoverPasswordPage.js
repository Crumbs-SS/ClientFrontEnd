import '../../style/login-page.css';
import {useState} from 'react';
import {clearErrors} from "../../actions/errorActions";
import {useDispatch} from "react-redux";
import ChangePasswordModal from "../modals/ChangePasswordModal";

const RecoverPasswordPage = () => {
    const token = window.location.pathname.split('/passwordRecovery/')[1];
    const [modalOpen, setModalOpen] = useState(true);
    const [pwChanged, setPwChanged] = useState(false);
    const dispatch = useDispatch();

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        dispatch(clearErrors());
    }
    if (!pwChanged) {
        return (
            <>
                <ChangePasswordModal show={modalOpen} onHide={closeModal} token={token} success={setPwChanged}/>
                <div className={"container"}>
                    <div className={"button"} onClick={() => openModal()}>Change Your Password</div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className={"container"}><h1>Your password has been changed.</h1></div>

            </>
        )
    }
}

export default RecoverPasswordPage;
