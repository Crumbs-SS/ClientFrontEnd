import '../../style/profile-page.css';
import {Col, Container, Row} from "react-bootstrap";
import Header from '../Header';
import {useDispatch, useSelector} from "react-redux";
import OrderHistory from "../OrderHistory";
import {useState} from "react";
import AccountDeleteForm from "../forms/AccountDeleteForm";
import ProfileUpdateForm from "../forms/ProfileUpdateForm";
import ProfilePageModal from "../modals/ProfilePageModal";
import {clearErrors} from "../../actions/errorActions";

const ProfilePage = () => {
    const user = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalComp, setModalComp] = useState(null);

    const openModal = (comp) => {
        setModalOpen(true);
        setModalComp(comp);
    }
    const closeModal = () => {
        dispatch(clearErrors());
        setModalOpen(false);
        setModalComp(null);
    }

    const userElements = (user) => {
        return (
            <>
                <Col>
                    <Container id="ProfileInfoContainer">
                        <Row>
                            <Col xs={6} md={4}>Username:</Col>
                            <Col>{user.username}</Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={4}>Email:</Col>
                            <Col>{user.email}</Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={4}>First Name:</Col>
                            <Col>{user.firstName}</Col>
                        </Row>

                        <Row>
                            <Col xs={6} md={4}>Last Name:</Col>
                            <Col>{user.lastName}</Col>
                        </Row>
                    </Container>
                </Col>
            </>
        );
    };

    return (
        <>
            <Header />
            <ProfilePageModal show={modalOpen} onHide={closeModal} comp={modalComp}/>
            <div className="profile-page">
                <Container>
                    <Row>
                        {userElements(user, role)}
                        <Col><OrderHistory/></Col>
                    </Row>
                    <Row className="profile-buttons justify-content-md-center">
                        <div className="button"
                             onClick={() => openModal(<ProfileUpdateForm user={user} close={closeModal}/>)}>
                            Edit Profile
                        </div>
                        <div className="button"
                             onClick={() => openModal(<AccountDeleteForm username={user.username} close={closeModal}/>)}>
                            Delete Account
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ProfilePage;
