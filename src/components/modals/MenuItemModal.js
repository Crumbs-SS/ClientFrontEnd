import '../../style/menuItemModal.css';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';

const MenuItemModal = ({ show, menuItem, onHide }) => {

  const defaultImage = "http://www.texasmonthly.com/wp-content/uploads/2015/11/Tacos-Al-Pastor-Tierra-Caliente-Houston.jpg"
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const loggedIn = user != null;
  const isCustomer = (user ? user.customer : false);
  const authorized = (!loggedIn || isCustomer);
  const maxQuantity = 50;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const [ quantity, setQuantity ] = useState(1);
  const [ preferences, setPreferences ] = useState('');
  const [ redirect, setRedirect ] = useState('');

  const changeQuantity = mode => {
    switch(mode){
      case 'inc':
        setQuantity(quantity + 1);
        break;
      case 'dec':
        if(quantity > 1)
          setQuantity(quantity - 1);
        break;
      default:
        const input = mode.target.value;
        if(isNumeric(input) && parseInt(input) >= 1)
          setQuantity(parseInt(input));
        else
          setQuantity(1);
    }
  }

  const addItemToCart = () => {
    if(!show) return;
    if(!authorized) return onHide();
    if(!isCustomer) return setRedirect('/login');

    const menuItemObj = {...menuItem, preferences};

    for (let i = 0; i < quantity; i++)
      dispatch(addToCart(user.id, menuItemObj));

    onHide();
    setPreferences('');
    setQuantity(1);
  }

  const isNumeric = str =>  str && str.match("[0-9.]+");

  return(
    <div className='menu-item-modal'>
      <Modal
        show={show}
        onHide={onHide}
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title> <b>{menuItem.name}</b> </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <b> Description </b>
          <p className='m-description'>
            { menuItem.description }
          </p>

          <div className='menu-item-modal-image'>
            <img
              alt={menuItem.name}
              src={defaultImage}
            />
          </div>

          <br />

          <div className='preferences'>
            <br />
            <div className='extra-instructions'>
              <b> Extra instructions </b>
              <span> List any special requests </span>
            </div>
            <textarea
              onChange={e => setPreferences(e.target.value)}
              value={preferences}
              className='preferences-textbox'
            />
          </div>

        </Modal.Body>

        <Modal.Footer>
          { authorized ?
            <div className='quantities'>
              <div
                onClick={() => changeQuantity('dec')}
                className='decrease quantity-button'
              >
                <i className="fas fa-minus-circle"></i>
              </div>

              <br />

              <input
                onChange={changeQuantity}
                type="text"
                value={ quantity }
              />

              <div onClick={() => changeQuantity('inc')} className='increase quantity-button'>
                <i className="fas fa-plus-circle"></i>
              </div>

            </div> : null }

          <Button
            onClick={addItemToCart}
            variant='danger'
            className='add-to-cart'
            disabled={(quantity >= maxQuantity)}
          >
            { authorized ?  (show) ?
              `Add to cart - ${formatter.format(menuItem.price * quantity)}`
              : <Spinner animation="grow" variant='light' />
            : `Close` }
          </Button>

        </Modal.Footer>

      </Modal>
      { redirect ? <Redirect push to={redirect} /> : null }
    </div>
  )
}

export default MenuItemModal;
