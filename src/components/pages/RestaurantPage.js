import '../../style/restaurant-page.css';
import RestaurantService from '../../adapters/restaurantService';
import { useEffect, useState } from 'react';
import Header from '../Header';
import MenuItem from '../MenuItem';
import { setFoodSearchOption } from '../../actions/queryActions';
import { useSelector, useDispatch } from 'react-redux';
import MenuItemModal from '../modals/MenuItemModal';

const RestaurantPage = () => {
  const defaultImage = 'https://media.istockphoto.com/photos/table-top-counter-with-blurred-people-and-restaurant-interior-picture-id1077538138?k=6&m=1077538138&s=170667a&w=0&h=fFWA2PnwCxXAeOnlB58rJiMqTDXy1-UZs7tHliD2f78=';

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const state = useSelector(state => state.search);
  const query = state.query;
  const foodSearchOption = state.foodSearchOption;

  const [restaurant, setRestaurant] = useState(null);
  const [location, setRestaurantLocation] = useState(null);
  const [foodQuery, setFoodQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({});

  const {
    name,
    menuItems,
    categories,
    rating,
    priceRating
  } = restaurant ? restaurant : {};

  const [shownMenuItems, setShownMenuItems] = useState(menuItems);

  let categoryRow = '';
  let stars = [];
  let expenseRating = '$';
  let restaurantLocation = '';

  for (let i = 0; i < 5; i++)
    stars = [...stars, <span key={i} className="far fa-star" />]

  if (rating) {
    for (var i = 0; i < rating; i++)
      stars[i] = <span key={i} className="fa fa-star highlight" />
  }

  if (categories) {
    categories.forEach(({ id: { categoryId } }, i) => {
      categoryRow += categoryId.replace(/^\w/, c => c.toUpperCase());
      if (categories[i + 1])
        categoryRow += ', ';
    });
  }

  if (priceRating) {
    for (let i = 1; i < priceRating; i++)
      expenseRating += '$';
  }
  if (location) {
    restaurantLocation += location.street + ', ' + location.city + ', ' + location.state + ', ' + location.zipCode
  }

  useEffect(() => {
    const id = window.location.pathname.split('/restaurants/')[1];
    if (foodSearchOption) {
      setFoodQuery(query);
      dispatch(setFoodSearchOption());
    }

    RestaurantService.findRestaurant(id, token)
      .then(({ data }) => {
        setRestaurant(data);
        setRestaurantLocation(data.location);
        setShownMenuItems(data.menuItems.filter(
          ({ name }) => name.toLowerCase().includes(foodQuery)
        ));
      })
      .catch(() => { })
  }, [query, foodSearchOption, foodQuery, dispatch, token])

  const onChange = text => {
    text = text.toLowerCase();
    setFoodQuery(text);
    setShownMenuItems(menuItems.filter(
      ({ name }) => name.toLowerCase().includes(text)
    ));
  }

  const openModal = menuItem => {
    setModalOpen(true);
    setModalDetails(menuItem);
  }

  return (
    <>
      <Header />
      <div id='restaurant-page'>
        <MenuItemModal
          show={isModalOpen}
          menuItem={modalDetails}
          onHide={() => setModalOpen(false)}
        />
        <div className='hero-holder'>
          <div className='img-holder1'>
            <img
              alt="restaurant"
              src={defaultImage}
              className="restaurant-img"
            />
          </div>
          <h1> {name} </h1>
          <div className='details'>
            {categoryRow}&nbsp;&nbsp;•
            <div className='stars'>
              &nbsp;&nbsp;{stars}&nbsp;&nbsp;
            </div>
            •&nbsp;&nbsp;{expenseRating}

          </div>
          <div className='location'>
            {restaurantLocation}
          </div>

          <div className="inline-header"></div>

          <div className='full-menu'>
            <div className='full-menu-header'>
              <h2> Menu </h2>
              <input
                type="text"
                placeholder="Search"
                className="search-input"
                value={foodQuery}
                onChange={e => onChange(e.target.value)}
              />
            </div>
            <div className="inline-header"></div>

            <div className='menu-items'>
              {shownMenuItems ? shownMenuItems.map(menuItem =>
                <MenuItem key={menuItem.id} menuItem={menuItem}
                  openModal={openModal}
                />)
                : null}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default RestaurantPage;
