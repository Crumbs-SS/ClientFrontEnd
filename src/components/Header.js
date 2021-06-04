import '../style/header.css';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { useState } from 'react';
import {Redirect, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/authActions";

const Header = ({ setQuery }) => {
  const [ searchText, setSearchText ] = useState('');
  const [ redirectUser, doRedirectUser ] = useState(false);

  const loggedIn = useSelector(state => state.auth.user !== null);
  const dispatch = useDispatch();

  const searchForContent = (e) => {
    e.preventDefault();
    if(searchText){
      setQuery(searchText);
      doRedirectUser(true);
    }
  }

  const setSearchTextSafe = text => {
    doRedirectUser(false);
    setSearchText(text);
  }

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
            <div className="vert-line"></div>
          </Nav>
          <Nav className="title-name">
            Crumbs
          </Nav>
          <Form inline onSubmit={searchForContent}>
            <input
              onChange={e => setSearchTextSafe(e.target.value)}
              type="text"
              placeholder="Search"
              className="search-input"
            />
            <span className="shopping-icon">0</span>
          </Form>
        </Navbar>
        <div className="inline-header"></div>
      </div>
      { redirectUser ? <Redirect push to={`/search?query=${searchText}`}/> : null }
    </>
  )
}

export default Header;
