import '../style/header.css';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { setQuery } from '../actions/queryActions';
import { useDispatch, useSelector } from 'react-redux';
import CartBar from './CartBar';

const Header = () => {
  const dispatch = useDispatch();

  const [ searchText, setSearchText ] = useState('');
  const [ redirectUser, doRedirectUser ] = useState(false);
  const [ cartBar, setCartBar ] = useState(false);

  const cart = useSelector(state => state.cart);
  const cartDetails = {
    items: cart.shoppingCart,
    total: cart.total
  };

  const searchForContent = e => {
    e.preventDefault();
    if(searchText){
      dispatch(setQuery(searchText));
      doRedirectUser(true);
    }
  }

  const setSearchTextSafe = text => {
    doRedirectUser(false);
    setSearchText(text);
  }


  return(
    <>
      <div id="header-component">
        <Navbar>
          <Nav className="mr-auto">
            <div className="sidebar-opener"></div>
            <Nav.Link href= "/">Home</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            <div className="vert-line"></div>
          </Nav>
          <Nav className="title-namee">
            CRUMBS
          </Nav>
          <Form inline onSubmit={searchForContent}>
            <input
              onChange={e => setSearchTextSafe(e.target.value)}
              type="text"
              placeholder="Search"
              className="search-input"
            />
            <span onClick={() => setCartBar(!cartBar)} className="fas fa-shopping-cart shopping-icon">&nbsp;&nbsp;{cartDetails.items.length}</span>
          </Form>
        </Navbar>
        <div className="inline-header"></div>
      </div>
      <CartBar active={cartBar} />
      { redirectUser ? <Redirect push to={'/search'}/> : null }
    </>
  )
}

export default Header;
