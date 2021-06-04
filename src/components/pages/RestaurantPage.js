import '../../style/restaurant-page.css';
import RestaurantService from '../../adapters/restaurantService';
import { useEffect, useState } from 'react';
import Header from '../Header';
import { Form } from 'react-bootstrap';
import MenuItem from '../MenuItem';


const RestaurantPage = ()  => {

  const [ restaurant, setRestaurant ] = useState(null);
  const {
    name,
    menuItems,
    categories,
    rating,
    priceRating
  } = restaurant ? restaurant : {};

  let categoryRow = '';
  let stars = [];
  let expenseRating = '$';

  for (let i = 0; i < 5; i++)
    stars = [...stars, <span key={i} className="far fa-star" />]

  if (rating) {
    for (var i = 0; i < rating; i++)
      stars[i] = <span key={i} className="fa fa-star highlight" />
  }

  if (categories){
    categories.forEach(({id: {categoryId}}, i) => {
      categoryRow += categoryId.replace(/^\w/, c => c.toUpperCase());
      if(categories[i + 1])
        categoryRow+= ', ';
    });
  }

  if(priceRating){
    for(let i = 1; i < priceRating; i++)
      expenseRating += '$';
  }

  const defaultImage = 'https://media.istockphoto.com/photos/table-top-counter-with-blurred-people-and-restaurant-interior-picture-id1077538138?k=6&m=1077538138&s=170667a&w=0&h=fFWA2PnwCxXAeOnlB58rJiMqTDXy1-UZs7tHliD2f78=';

  useEffect(() => {
    const id = window.location.pathname.split('/restaurants/')[1];
    RestaurantService.findRestaurant(id)
    .then(({ data }) => {
      setRestaurant(data);
    })
    .catch(() => {})
  }, [])

  return(
    <>
      <Header />
      <div id='restaurant-page'>
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
          <div className="inline-header"></div>

          <div className='full-menu'>
            <div className='full-menu-header'>
              <h2> Menu </h2>
                <Form inline>
                  <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                  />
                </Form>
            </div>
            <div className="inline-header"></div>

            <div className='menu-items'>
              {
                menuItems ? menuItems.map(menuItem =>
                  <MenuItem key={menuItem.id} menuItem={menuItem} />)
                    : null
              }
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default RestaurantPage;
