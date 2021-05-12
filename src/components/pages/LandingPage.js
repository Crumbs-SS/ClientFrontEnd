import '../../style/landing-page.css';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import RestaurantService from '../../adapters/restaurantService';
import SideBar from '../SideBar';

const LandingPage = () => {

  const [ searchText, setSearchText ] = useState('');

  const searchForContent = (e) => {
    if(e) e.preventDefault();
    if(searchText){
      RestaurantService.getRestaurants(searchText)
      .then(response => response.json())
      .then(console.log)
    }
  }

  return(
    <>
      <SideBar />
      <div id="landing-page">
        <div id="title-holder">
          <h1 id="title-name"> SCRUMPTIOUS </h1>
          <div id="search-bar">
            <Form onSubmit={searchForContent}>
              <input
                className="input-text"
                onChange={e => setSearchText(e.target.value)}
                placeholder="Enter restaurant name"
              ></input>
            </Form>
            <div id="search-button" onClick={searchForContent}>
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage;
