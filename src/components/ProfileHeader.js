import '../style/header.css';
import {Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/authActions";

const ProfileHeader = () => {
    const loggedIn = useSelector(state => state.auth.user !== null);
    const dispatch = useDispatch();

    const logoutLink = () => {
        return (
            <Nav.Link
                onClick={() => dispatch(logout())}>
                Logout
            </Nav.Link>
        );
    }

    return(
        <>
            <div id="header-component">
                <Navbar>
                    <Nav className="mr-auto">
                        <div className="sidebar-opener"></div>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {
                            loggedIn ?
                                <>
                                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                    {logoutLink()}
                                </>
                                : null
                        }
                        <Nav.Link as={Link} to="/search">Search</Nav.Link>
                        <div className="vert-line"></div>
                    </Nav>
                    <Nav className="title-name">
                        Crumbs
                    </Nav>
                </Navbar>
                <div className="inline-header"></div>
            </div>
        </>
    )
}

export default ProfileHeader;
