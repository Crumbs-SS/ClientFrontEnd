import '../style/menuItemModal.css';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const MenuItemModal = ({ show, menuItem, onHide }) => {

  const defaultImage = "http://www.texasmonthly.com/wp-content/uploads/2015/11/Tacos-Al-Pastor-Tierra-Caliente-Houston.jpg"
  const dispatch = useDispatch();

  const maxQuantity = 50;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const [ quantity, setQuantity ] = useState(1);
  const [ preferences, setPreferences ] = useState('');

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

    const menuItemObj = {...menuItem, preferences};

    for (let i = 0; i < quantity; i++)
      dispatch(addToCart(menuItemObj));

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

          </div>

          <Button
            onClick={addItemToCart}
            variant='danger'
            className='add-to-cart'
            disabled={(quantity >= maxQuantity)}
          >
            { (show) ?
              `Add to cart - ${formatter.format(menuItem.price * quantity)}`
              : <Spinner animation="grow" variant='light' />}
          </Button>

        </Modal.Footer>

      </Modal>
    </div>
  )
}

export default MenuItemModal;
