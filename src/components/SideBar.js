import '../style/sidebar.css';
import {Link, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../actions/authActions'
import {useState} from "react";
import CustomerRegistrationForm from "./forms/CustomerRegistrationForm";
import DriverRegistrationForm from "./forms/DriverRegistrationForm";
import OwnerRegistrationForm from "./forms/OwnerRegistrationForm";
import RegistrationModal from "./modals/RegistrationModal";
import {clearErrors} from "../actions/errorActions";

const SideBar = () => {
    const selectColor = {color: "red"};
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalRole, setModalRole] = useState(null);
    const [modalComp, setModalComp] = useState(null);

    const openModal = (role, comp) => {
        setModalOpen(true);
        setModalRole(role);
        setModalComp(comp);
    }
    const closeModal = () => {
        setModalOpen(false);
        setModalRole(null);
        setModalComp(null);
        dispatch(clearErrors());
    }

    const loginLink = () => {
        return (
            <>
                <NavLink
                    to='/login'
                    activeStyle={selectColor}>
                    <i className="fas fa-user"></i> Sign In
                </NavLink>
                <NavLink
                    to='#'
                    activeStyle={selectColor}
                    onClick={() => openModal("customer", <CustomerRegistrationForm close={closeModal}/>)}>
                    <i className="fas fa-user"></i> Sign Up
                </NavLink>
            </>
        );
    }

    const logoutLink = () => {
        return (
            <NavLink
                to='#'
                activeStyle={selectColor}
                onClick={() => dispatch(logout())}>
                <i className="fas fa-user"></i> Sign Out
            </NavLink>
        );
    }
    const loginOrOutLink = user ? logoutLink() : loginLink();

    const becomeDriver = () => {
        return (
            <NavLink
                to="#"
                onClick={() => openModal("driver", <DriverRegistrationForm close={closeModal}/>)}>
                Register as a driver
            </NavLink>
        );
    };

    const becomeDriverLink = user ? "" : becomeDriver();

    const becomeOwner= () => {
        return (
            <NavLink
                to="#"
                onClick={() => openModal("owner", <OwnerRegistrationForm close={closeModal}/>)}>
                Register as a Restaurant Owner
            </NavLink>
        );
    };

    const becomeOwnerLink = user ? "" : becomeOwner();

    return (
        <div id="side-bar">
            <RegistrationModal show={modalOpen} onHide={closeModal} role={modalRole} comp={modalComp}/>
            <div className="head">
                <NavLink
                    to='/'
                    activeStyle={selectColor}>
                    <i className="fas fa-home"></i> Home
                </NavLink>

                <div className="line"></div>
                {loginOrOutLink}
            </div>

            <div className='inline'></div>

            <div className="body">
                <Link
                    to={{pathname: "http://localhost:4200/utopia/restaurants/addRestaurant"}}
          target="_blank">
           Add Restaurant
        </Link>
                {becomeDriverLink}
                {becomeOwnerLink}
        <Link
          to={{pathname: "https://google.com/"}} target="_blank">
           Company Portal
        </Link>
        <NavLink to='restaurantOwner'>
            <i>Owner Page</i>
        </NavLink>
      </div>

    </div>
  )

}

export default SideBar;
