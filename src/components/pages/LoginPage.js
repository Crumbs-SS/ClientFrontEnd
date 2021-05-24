import '../../style/login-page.css';
import {useState} from 'react';
import SideBar from '../SideBar';
import {Button} from 'react-bootstrap';
import LoginModal from '../LoginModal';

const LoginPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState(null);

    const openModal = (role) => {
        setModalOpen(true);
        setModalRole(role);
    }
    const closeModal = () => {
        setModalOpen(false);
        setModalRole(null);
    }


    return (
        <>
            <SideBar/>
            <div id="login-page">
                <LoginModal show={modalOpen} onHide={closeModal} role={modalRole}/>
                <div className={"container row align-items-center"}>
                    <Button variant="primary" onClick={() => openModal("customer")}>Login as Customer</Button>
                    <Button variant="primary" onClick={() => openModal("driver")}>Login as Driver</Button>
                    <Button variant="primary" onClick={() => openModal("owner")}>Login as Owner</Button>
                </div>
            </div>
    </>
  )
}

export default LoginPage;
